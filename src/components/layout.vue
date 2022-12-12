<template>
    <div id="app" class="app" oncontextmenu="return false;">
        <page-header @connectToWallet="connectToWallet" :connect-wallet-status="connectWalletStatus" @setConnectWalletStatus="setConnectWalletStatus"></page-header>
        <div class="page-body">
            <el-scrollbar class="router-view-scrollbox" style="height:100%">
                <router-view class="router-view" />
            </el-scrollbar>
        </div>
    </div>
</template>
<script>
import PageHeader from '@/components/PageHeader.vue'
import { setChainChangedCallback, setAccountsChangedCallback, setDisconnectCallback, getWalletInfo, setUpSigner, connectToWallet } from "@/web3/common/wallet";

export default {
    name: 'Layout',
    components: {
        PageHeader,
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
        connectToWallet(type) {
            this.$store.commit('setWalletName', type);
            if (type === 'BitKeep' && !this.provider) {
                // window.open("https://bitkeep.com/en/download?type=0&theme=light");
                // this.$message.warning('please install BitKeep');
                this.connectWalletStatus = -1;
                return;
            }
            if (type === 'MetaMask' && (!this.provider || this.provider.isBitKeep)) {
                // this.$message.warning('please install MetaMask');
                this.connectWalletStatus = -1;

                return;
            }
            connectToWallet(type).then(() => {
                // console.log(`%c${'222222'}`, 'font-size:30px;color:#aa5ff0');
                this.setConnectedStateInfo();
                this.watchWalletconnectionStatus();
                // this.connectWalletStatus = 1;

            }).catch(() => {
                console.error("Wallet connect failed.");
                this.connectWalletStatus = -1;

            });
        },
        setDisconnectedStateInfo() {
            this.$store.commit('setWalletName', '');

            this.$store.commit('setWalletInfo', {
                address: '',
                network: '',
                balance: '',
                chainId: '',
            });
        },
        setConnectedStateInfo() {
            getWalletInfo().then((info) => {
                this.$store.commit('setWalletInfo', info);
            });
        },
        setStateInfo(connectionStatus) {
            if (connectionStatus == 'disconnected') {
                this.setDisconnectedStateInfo();
            } else if (connectionStatus == 'connected') {
                setUpSigner(this.walletName);
                this.setConnectedStateInfo();
                this.watchWalletconnectionStatus();
            }
        },
        async getBitKeepWalletInfo() {
            console.log('try connect to bitkeep');

            this.$store.commit('setWalletName', 'BitKeep');
            if (this.provider) {
                let accounts = await this.provider.request({ method: 'eth_accounts' });
                if (accounts[0]) {
                    this.setStateInfo('connected');
                } else {
                    throw 'get BitKeep wallet info error'
                }
            } else {
                throw 'get BitKeep wallet info error'
            }
        },
        async getMetaMaskWalletInfo() {
            console.log('try connect to metamask');
            this.$store.commit('setWalletName', 'MetaMask');
            if (this.provider) {
                let accounts = await this.provider.request({ method: 'eth_accounts' });
                if (accounts[0]) {
                    this.setStateInfo('connected');
                } else {
                    this.setStateInfo('disconnected');
                }
            } else {
                this.setStateInfo('disconnected');
                console.warn("please install injected wallet");
            }
        },
        async init() {
            try {
                await this.getBitKeepWalletInfo();
            } catch (e) {
                console.log(e);
                this.getMetaMaskWalletInfo();
            }
        },
        watchWalletconnectionStatus() {
            if (this.provider) {
                this.provider.removeAllListeners();
            }
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

        },

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