import * as wallet from "./wallet.js"

import * as web3Config_v2_0 from "../v2_0/web3Config.js"
import * as web3Config_v2_1 from "../v2_1/web3Config.js"

import store from '@/store'

import { chainName, networkName, tokenName } from "./web3Config.js"
import * as web3 from '@/web3'
import { Notification } from 'element-ui';

const errorConfig = 'Web3Config | ';


export async function getContractAdr(contractName, version = store.state.environment.version) {
    let _chainId = await wallet.getChainId();
    return getContractAdr2(contractName, _chainId, version);
}

export function getContractAdr2(contractName, chainId, version = store.state.environment.version) {
    let name = getChainName2(chainId);

    let adr;

    if (version === 'v2_0') {
        adr = web3Config_v2_0.address[name][contractName];
    } else if (version === 'v2_1') {
        adr = web3Config_v2_1.address[name][contractName];
    }


    if (adr == undefined) {
        throw Error(errorConfig + "Contract not found in config of: " + name);
    }
    return adr;
}

export function getStakeContractAddress(chainId, stakeVersion, version = store.state.environment.version) {
    let stakeContractAddress
    if (version === 'v2_0') {
        stakeContractAddress = web3Config_v2_0.stakeContractAddress[chainId];
    } else if (version === 'v2_1') {
        stakeContractAddress = web3Config_v2_1.stakeContractAddress[chainId][stakeVersion];
    }
    if (stakeContractAddress == undefined) {
        throw Error(errorConfig + "stakeContractAddress not found in config of: " + chainId);
    }
    return stakeContractAddress;
}


export function defaultOwnerIfNotSet(owner = null) {
    if (owner == null) {
        return wallet.getUserAddress();
    }
    return owner;
}




export function getChainName2(chainId) {
    let name = chainName[chainId];
    if (name == undefined) {
        throw Error(errorConfig + "Chain not found in config.")
    }
    return name;
}

export async function getChainName() {
    let _chainId = await wallet.getChainId();
    return getChainName2(_chainId);
}

export function findEventArgs(events, eventName) {
    for (const event of events) {
        if (event.event == eventName) {
            return event.args;
        }
    }
    return null;
}

export function getChainIdByNetwork(network) {
    let chainId = '';
    for (let key in networkName) {
        if (networkName[key] === network) {
            chainId = key;
        }
    }
    if (chainId !== '') {
        return '0x' + Number(chainId).toString(16);
    } else {
        throw new Error('getChainIdError');
    }
}



export function getChainNameList() {
    return chainName;
}
export function getTokenNameList() {
    return tokenName;
}


export { networkName };



export async function approve(address, contractAdr) {
    try {
        await web3.approve_erc20(address, contractAdr)
        Notification.success({
            title: "Succeeded",
        });
    } catch (err) {
        Notification.error({
            title: "Error",
            message: err.message,
            // duration: 0,
        });
        throw err;
    }
}
export async function isNeedApprove(amount, address, contractAdr) {
    const amountAllowed = await web3.isApproved_erc20(address, contractAdr);
    if (amountAllowed === false) {
        return false;
    }
    return amount.gte(amountAllowed)

}