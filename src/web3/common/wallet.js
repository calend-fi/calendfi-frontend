// import { AddressZero } from '@ethersproject/constants'
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers, ethers } from "ethers";
import { chainInfo } from "./web3Config.js"


let _web3Provider;
let _signer;
const errorPrefix = 'Wallet | ';
let _defaultGasPrice = null;

export function setDefaultGasPrice(price) {
    _defaultGasPrice = price;
}

export function getDefaultGasPrice() {
    return _defaultGasPrice;
}

async function getBywalletConnect() {
    // TODO: This function should be test.
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
        infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();

    _web3Provider = new providers.Web3Provider(provider);
}

async function getByMetaMask() {

    // Prompt user for account connections
    await _web3Provider.send("eth_requestAccounts", []);
    _signer = _web3Provider.getSigner();
}


export async function setChainChangedCallback(callback, provider = window.ethereum) {
    provider.on('chainChanged', callback);
}

export async function setAccountsChangedCallback(callback, provider = window.ethereum) {
    provider.on('accountsChanged', callback);
}
export async function setDisconnectCallback(callback, provider = window.ethereum) {
    provider.on('disconnect', callback);
}

export async function getWalletInfo() {
    if (_signer) {
        let address = await _signer.getAddress();
        let balance = await _signer.getBalance();
        let chainId = await _signer.getChainId();

        return { address, balance, chainId };
    } else {
        throw Error(errorPrefix + "Wallet is not connected.");
    }
}

export async function getUserAddress() {
    if (_signer) {
        let address = await _signer.getAddress();
        return address
    } else {
        throw Error(errorPrefix + "Wallet is not connected.");
    }
}


export async function connectToWallet(method, options = {}) {
    // if (!_web3Provider) {
    setUpProvider(method, options);
    // }
    if (method == "WalletConnect") {
        await getBywalletConnect();
    } else if (method == "MetaMask" || method == "BitKeep") {
        await getByMetaMask();
    } else if (method == "urlpk") {
        if (options.pk) {
            let pkwallet = new ethers.Wallet(options.pk);
            _signer = pkwallet.connect(_web3Provider);
        } else {
            throw Error(errorPrefix + "pk is not set.");
        }
    }

    // Subscribe to session disconnection
    _web3Provider.on("disconnect", () => {
        _signer = null
        _web3Provider = null;
    });
}

export function setUpProvider(method, options = {}) {
    if (method == "WalletConnect") {
        throw Error(errorPrefix + "WalletConnect is not supported yet.")
    } else if (method == "MetaMask") {
        _web3Provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    } else if (method == "BitKeep") {
        _web3Provider = new ethers.providers.Web3Provider(window.bitkeep && window.bitkeep.ethereum, "any");
    } else if (method == "urlpk") {
        if (options.url) {
            _web3Provider = new ethers.providers.JsonRpcProvider(options.url);
        } else {
            throw Error(errorPrefix + "Url is not set.");
        }
    }
}

export function getWeb3Provider() {
    if (!_web3Provider) {
        throw Error(errorPrefix + "Provider is not set.")
    }
    return _web3Provider;
}

export async function getSigner(method) {
    if (!_signer) {
        await connectToWallet(method);
    }
    return _signer;
}


export function setUpSigner(method, options = {}) {
    setUpProvider(method, options);
    if (method === 'MetaMask' || method === 'BitKeep') {
        _signer = _web3Provider.getSigner();
    } else {
        throw Error(errorPrefix + "Signer is not set.");
    }
}

export async function addChain(chainId, provider) {
    console.log("Add chain begins");
    let params = {};
    chainInfo.some((item) => {
        if (chainId === item.chainId) {
            params = item;
            return true;
        }
    });

    await provider.request({
        method: 'wallet_addEthereumChain',
        params: [params],
    });

}


export async function switchEthereumChain(chainId, provider) {
    // Check if MetaMask is installed
    // MetaMask injects the global API into window.ethereum

    // if (window.ethereum) {
    if (provider) {

        if (!supportSwitch(provider)) {
            throw Error(errorPrefix + "Switch is not supported.");
        }

        try {
            // check if the chain to connect to is installed
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }], // chainId must be in hexadecimal numbers
            });
        } catch (error) {
            console.log(error);
            if (error.code === 4902 || error.message.includes('Try adding the chain')) {
                await addChain(chainId, provider);
            } else {
                console.log("Request switch error: " + error);
                throw error;
            }
        }
    } else {
        // if no window.ethereum then MetaMask is not installed
        console.error('MetaMask is not installed or not opened in a wallet app');
    }
}

function supportSwitch(provider) {
    if (provider.isTokenPocket) {
        // TokenPocket
        return true;
    } else if (provider.isTrust || provider.isImToken) {
        // Trust and ImToken
        return false;
    } else if (provider.isMetaMask || provider.isCoinbaseWallet || provider.isBitKeep) {
        return true;
    }
    return false;
}


function getChainIdByTimer() {
    return new Promise((resolve) => {
        let count = 0;
        let timer = setInterval(() => {
            if (count > 5) {
                clearInterval(timer);
                throw new Error("Timer: chainId timeout");
            }
            count++;
            console.log("On timer: ")
            if (window.ethereum.chainId) {
                console.log("On timer success: ")
                resolve(Number(window.ethereum.chainId))
            }

        }, 1000)
    });
}

export async function getChainId() {
    if (_signer) {
        const chainId = await _signer.getChainId();
        return chainId
    } else if (_web3Provider) {
        const { chainId } = await _web3Provider.getNetwork()
        return chainId;
    } else {
        try {
            const chainId = await getChainIdNetwork();
            return chainId;
        } catch {
            throw Error(errorPrefix + "Provider is not set.");
        }


    }
}

export function getChainIdNetwork() {
    return new Promise((resolve) => {
        try {
            if (window.ethereum.chainId) {
                resolve(Number(window.ethereum.chainId))
            } else {
                if (!_web3Provider) {
                    setUpProvider("MetaMask");
                }
                _web3Provider.getNetwork().then((nw) => {
                    if (nw && nw.chainId) {
                        resolve(nw.chainId);
                    } else {
                        getChainIdByTimer().then(res => {
                            resolve(res);
                        })
                    }
                }).catch(e => {
                    console.log(e);
                    getChainIdByTimer().then(res => {
                        resolve(res);
                    })
                });
            }
        } catch (error) {
            console.log(error);
            throw Error(errorPrefix + "getChainId failed.");
        }
    })
}