<template>
    <div id="app" class="app" oncontextmenu="return false;">
        <page-header></page-header>
        <div class="page-body">
            <el-scrollbar class="router-view-scrollbox" style="height:100%">
                <router-view class="router-view" />
            </el-scrollbar>
        </div>
        <connect-wallet-dialog :connect-wallet-status="connectWalletStatus" @connectToWallet="connectToWallet" @setConnectWalletStatus="setConnectWalletStatus"></connect-wallet-dialog>
    </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import ConnectWalletDialog from '@/components/ConnectWalletDialog.vue'
// import { setChainChangedCallback, setAccountsChangedCallback, setDisconnectCallback } from "@/web3/common/wallet";


// import BrowserWallet
import { BrowserWallet } from '@meshsdk/core';

export default {
    name: 'Layout',
    components: {
        PageHeader,
        ConnectWalletDialog
    },
    data() {
        return {
            connectWalletStatus: 0, // -1 error, 0 not connect, 1 success;
        }
    },
    computed: {
        provider() {
            return this.$store.getters.provider;
        },
        walletName() {
            return this.$store.getters.walletName;
        }

    },
    created() {
        this.init();

    },
    mounted() {

    },
    methods: {
        setConnectWalletStatus(status) {
            this.connectWalletStatus = status;
        },
        async init() {
            if (this.walletName) {
                BrowserWallet.enable(this.walletName).then((wallet) => {
                    this.setConnectedStateInfo(wallet);
                    // this.watchWalletconnectionStatus();
                }).catch((error) => {
                    console.error(error);
                    this.setDisconnectedStateInfo();
                })
            }
        },
        connectToWallet(type) {
            BrowserWallet.enable(type).then((wallet) => {
                this.$store.commit('setWalletName', type);
                this.connectWalletStatus = 1;
                this.setConnectedStateInfo(wallet);
                // this.watchWalletconnectionStatus();
            }).catch((error) => {
                console.error(error);
                this.connectWalletStatus = -1;
                this.setDisconnectedStateInfo();
            });
        },
        setDisconnectedStateInfo() {
            this.$store.commit('setWalletName', '');
            this.$store.commit('setWalletInfo', {
                address: '',
                balance: '',
                networkId: '',
            });
        },
        async setConnectedStateInfo(wallet) {
            this.$store.commit('setShowWalletListDialogValue', false)
            let info = {
                address: "",
                balance: "",
                networkId: "",
            };
            info.balance = await wallet.getBalance();
            info.address = await wallet.getChangeAddress();
            info.networkId = await wallet.getNetworkId();
            this.$store.commit('setWalletInfo', info);
        },

        /* watchWalletconnectionStatus() {
             setChainChangedCallback(() => {
                 window.location.reload();
             }, this.provider);
             setAccountsChangedCallback((accounts) => {
                 if (accounts[0]) {
                     this.setConnectedStateInfo();
                 } else {
                     this.setDisconnectedStateInfo();
                 }
             }, this.provider);
             setDisconnectCallback(() => {
                 this.setDisconnectedStateInfo();
             }, this.provider);
         },*/

    },
    watch: {}
}
</script>
<style>
html,
body {}
</style>
<style scoped lang="scss">
.app {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background: #06070A;

    &:before {
        content: "";
        position: absolute;
        z-index: 1;
        border-radius: 50%;
        width: 1996px;
        height: 1996px;
        left: -1267px;
        top: 50%;
        transform: translateY(-50%);
        background: radial-gradient(50% 50% at 50% 50%, #285EB0 0%, rgba(6, 19, 31, 0.0001) 100%);
        mix-blend-mode: normal;
        opacity: 0.5;
    }

    &:after {
        content: "";
        position: absolute;
        z-index: 1;
        border-radius: 50%;
        width: 1996px;
        height: 1996px;
        right: -1267px;
        top: 50%;
        transform: translateY(-50%);

        background: radial-gradient(50% 50% at 50% 50%, #4A274A 0%, rgba(76, 38, 73, 0.0001) 100%);
        mix-blend-mode: normal;
        opacity: 0.5;
    }


    .page-header,
    .page-body {
        position: relative;
        z-index: 2;
    }

    .page-header {}

    .page-body {
        height: calc(100% - 81px);
        display: flex;

        ::v-deep .side-nav-menu {
            position: relative;
            height: 100%;
        }

        ::v-deep .router-view-scrollbox {
            flex: 1;

            .router-view {}
        }
    }
}
</style>