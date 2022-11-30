import * as wallet from "./wallet.js"
import { ethers } from "ethers"
import { BigNumber } from '@ethersproject/bignumber'
import { GAS_LIMIT_DEFAULT } from "./web3Config.js"


const errorPrefix = 'BaseContract | ';

// add 20%
function calculateGasMargin(value) {
    return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000))
}

async function handleTransaction(tx) {
    try {
        const txReceipt = await tx.wait(1);
        return txReceipt;
    } catch (error) {
        if (error.code == ethers.utils.Logger.errors.TRANSACTION_REPLACED) {
            if (!error.cancelled) {
                // Transaction is not cancelled.
                return this.handleTransaction(error.replacement)
            } else {
                throw Error(errorPrefix + "Transaction is cancelled")
            }
        } else {
            console.error('error', error);
        }
    }
}

class BaseContract {
    constructor(abi, address) {
        let provider = wallet.getWeb3Provider();
        this._contract = new ethers.Contract(address, abi, provider);
    }

    async contractWithSigner() {
        let signer = await wallet.getSigner();
        let factoryContractWithSigner = this._contract.connect(signer);
        return factoryContractWithSigner;
    }

    contract() {
        return this._contract;
    }

    async read(method, parameters = []) {
        const result = await this._contract.callStatic[method].apply(null, parameters);
        return result;
    }

    async write(method, parameters = [], options = {}) {
        let contractWithSigner = await this.contractWithSigner();
        let _gasLimit;

        parameters.push({
            value: options.value
        });
        try {
            const gasEstimate = await contractWithSigner.estimateGas[method].apply(null, parameters);
            console.log("Estimate gas is: ", gasEstimate);
            _gasLimit = calculateGasMargin(gasEstimate);

        } catch (error) {
            if (error.code == ethers.utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT) {
                console.log(errorPrefix + "Gas can not be estimated.");
            } else {
                console.log(error);
            }
            if (options.gasLimit != undefined) {
                _gasLimit = options.gasLimit;
            }
        }

        if (!_gasLimit) {
            _gasLimit = GAS_LIMIT_DEFAULT;
        }


        let _gasPrice = options.gasPrice;
        if (_gasPrice == undefined && wallet.getDefaultGasPrice() != null) {
            // Use global default gas price when: 
            // 1. Gas price is not set
            // 2. Global gas price is set
            _gasPrice = wallet.getDefaultGasPrice()
        }

        let parametersLen = parameters.length;
        const overrides = Object.assign({}, parameters[parametersLen - 1], {
            gasLimit: _gasLimit,
            gasPrice: _gasPrice,
            value: options.value
        });
        parameters[parametersLen - 1] = overrides;
        const tx = await contractWithSigner[method].apply(null, parameters);
        const txReceipt = await handleTransaction(tx);
        return txReceipt;
    }

}
export default BaseContract