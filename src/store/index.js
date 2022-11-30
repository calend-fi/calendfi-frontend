import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import { getVuexKey } from '@/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState({
        key: getVuexKey(location.href),
        storage: window.localStorage
    })],
    state: {
        wallet_info: {
            address: "",
            balance: "",
            chainId: "",
        },
        walletName: '',

    },
    getters: {
        walletInfo: state => state.wallet_info,
        walletName: state => state.walletName,

        provider: (state) => {
            let provider = null;
            switch (state.walletName) {
                case 'BitKeep':
                    provider = window.bitkeep && window.bitkeep.ethereum;
                    break;
                case 'MetaMask':
                    provider = window.ethereum;
                    break;
                default:
                    provider = window.ethereum;
            }
            if (!provider) {
                console.warn("please install injected wallet");
            }
            return provider;
        },
    },
    mutations: {
        setWalletInfo(state, value) {
            state.wallet_info = Object.assign({}, state.wallet_info, value)
        },
        setWalletName(state, value) {
            state.walletName = value ? value : ''
        },
    }
})

export default store