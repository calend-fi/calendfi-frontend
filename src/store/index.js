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
        showWalletListDialog: false,
        wallet_info: {
            address: "",
            balance: "",
            networkId: "",
        },
        walletName: '',

    },
    getters: {
        showWalletListDialog: state => {
            // return state.showWalletListDialog && !state.wallet_info.address
            return state.showWalletListDialog;
        },
        walletInfo: state => state.wallet_info,
        walletName: state => state.walletName,
        provider: () => window.cardano,
    },
    mutations: {
        setShowWalletListDialogValue(state, value) {
            state.showWalletListDialog = value;
        },

        setWalletInfo(state, value) {
            state.wallet_info = Object.assign({}, state.wallet_info, value)
        },
        setWalletName(state, value) {
            state.walletName = value ? value : ''
        },



    }
})

export default store