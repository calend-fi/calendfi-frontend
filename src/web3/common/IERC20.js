import { ethers } from "ethers";
import ABI_IERC20 from "./abis/IERC20.json"
import BaseContract from "./BaseContract.js"
import * as web3util from "./web3util.js"

import { getWalletInfo } from '@/web3/common/wallet.js'
import store from '@/store'


// const errorPrefix = 'IERC20 | ';

class IERC20 extends BaseContract {

    async write(method, parameters = [], options = {}) {
        let result = await super.write(method, parameters, options);
        getWalletInfo().then((res) => {
            store.commit('setWalletInfo', res);
        });
        return result;
    }
    async isApproved(spender, owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'allowance',
            [_owner, spender]
        )
        return result;
    }

    async approve(spender, amount = ethers.constants.MaxUint256) {
        const res = await this.write(
            'approve',
            [spender, amount], {
                gasLimit: 55762
            }
        )
        const event = web3util.findEventArgs(res.events, "Approval");
        return event;
    }


    async balanceOf(owner = null) {
        let _owner = await web3util.defaultOwnerIfNotSet(owner);
        const result = await this.read(
            'balanceOf',
            [_owner]
        )
        return result;
    }
    async getName() {
        const result = await this.read('name');
        return result
    }
    async getSymbol() {
        const result = await this.read('symbol');
        return result
    }
    async getTotalSupply() {
        const result = await this.read('totalSupply');
        return result
    }

    async getDecimals() {
        const result = await this.read('decimals');
        return result
    }
}


export default IERC20

export function createIErc20(address) {
    return new IERC20(ABI_IERC20, address);
}