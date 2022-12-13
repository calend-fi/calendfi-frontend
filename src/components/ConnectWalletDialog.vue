<template>
    <div class="connect-wallet-dialog">
        <el-dialog title="Connect a wallet" :visible.sync="showWalletList" width="400px" :modal-append-to-body="true" append-to-body custom-class="wallet-list-dialog" :close-on-click-modal="false" :before-close="handleCloseShowWalletList">
            <div class="wallet-list">
                <div class="wallet-item" :class="{'disabled':!installedWalletsNames.join().includes('nami')}" @click="connectWallet('nami')">
                    <img src="@/assets/imgs/page-header/nami.svg" alt="">
                    <span class="text">Nami</span>
                </div>
                <div class="wallet-item" :class="{'disabled':!installedWalletsNames.join().includes('flint wallet')}" @click="connectWallet('flint wallet')">
                    <img src="@/assets/imgs/page-header/flint.svg" alt="">
                    <span class="text">Flint</span>
                </div>
                <div class="wallet-item" :class="{'disabled':!installedWalletsNames.join().includes('eternl')}" @click="connectWallet('eternl')">
                    <img src="@/assets/imgs/page-header/eternl.svg" alt="">
                    <span class="text">Eternl</span>
                </div>
                <div class="wallet-item" :class="{'disabled':!installedWalletsNames.join().includes('typhon wallet')}" @click="connectWallet('typhon wallet')">
                    <img src="@/assets/imgs/page-header/typhon.svg" alt="">
                    <span class="text">Typhon</span>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="errorConnecting" width="400px" :modal-append-to-body="true" append-to-body custom-class="error-connecting-dialog" :close-on-click-modal="false" :before-close="handleCloseErrorConnecting">
            <div class="back" slot="title">
                <img src="@/assets/imgs/page-header/back.svg" alt="" @click="backToWalletSelection">
            </div>
            <img src="@/assets/imgs/page-header/warning.svg" alt="" class="warning">
            <div class="p1">Error connecting</div>
            <div class="p2">The connection attempt failed. Please click try again and follow the steps to connect in your wallet.</div>
            <el-button class="try-again" @click="tryAgain">Try Again</el-button>
            <div class="p3" @click="backToWalletSelection">Back to wallet selection</div>
        </el-dialog>
    </div>
</template>
<script>
// import BrowserWallet
import { BrowserWallet } from '@meshsdk/core';





export default {
    name: 'ConnectWalletDialog',
    computed: {
        installedWalletsNames() {
            return this.installedWallets.map((item) => {
                return item.name.toLowerCase();
            })
        }
    },
    props: ['connectWalletStatus'],

    watch: {
        '$store.getters.showWalletListDialog': {
            immediate: true,
            handler(val) {
                this.showWalletList = val;
                if (val) {
                    this.installedWallets = BrowserWallet.getInstalledWallets();
                }
            }
        },
        connectWalletStatus(val) {
            if (val == -1) {
                this.showWalletList = false;
                this.$store.commit('setShowWalletListDialogValue', false)
                this.errorConnecting = true;
            } else if (val == 1) {
                this.errorConnecting = false;

            }
        }
    },
    data() {
        return {
            showWalletList: false,
            errorConnecting: false,
            installedWallets: [],
            currentWalletName: '',
        }
    },
    mounted() {

    },
    methods: {
        handleCloseShowWalletList(done) {
            done();
            this.$store.commit('setShowWalletListDialogValue', false)
        },
        handleCloseErrorConnecting(done) {
            done();
            this.$emit('setConnectWalletStatus', 0)
        },
        connectWallet(type) {
            if (this.installedWalletsNames.join().includes(type)) {
                this.currentWalletName = type;
                this.$emit('connectToWallet', type)
            }
        },
        tryAgain() {
            this.$emit('connectToWallet', this.currentWalletName)
        },
        backToWalletSelection() {
            this.$emit('setConnectWalletStatus', 0);
            this.errorConnecting = false;
            this.$store.commit('setShowWalletListDialogValue', true)
        },

    },
}
</script>
<style lang="scss">
.wallet-list-dialog {
    width: 418px;
    min-height: 349px;
    background: #0E111A;
    border: 1px solid #293249;
    box-shadow: 12px 16px 24px rgba(0, 0, 0, 0.24);
    border-radius: 16px;

    overflow: hidden;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .el-dialog__header {
        height: 55px;
        padding: 0 0 0 16px;
        display: flex;
        align-items: center;
        border-bottom: 0;

        .el-dialog__title {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 18px;
            /* identical to box height */
            color: #FFFFFF;
        }

        .el-dialog__headerbtn {
            i {
                color: #fff;
                font-size: 24px;
            }
        }
    }

    .el-dialog__body {
        padding: 0 16px;

        .wallet-list {
            .wallet-item {
                display: flex;
                align-items: center;
                padding: 0 16px;
                cursor: pointer;
                height: 62px;
                background: #293249;
                border-radius: 12px;

                &:not(:last-child) {
                    margin-bottom: 10px;
                }

                img {
                    width: 28px;
                    margin-right: 12px;
                }

                .text {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: 19px;
                    /* identical to box height */


                    color: #FFFFFF;


                }

                &:hover {
                    opacity: .85;
                    // background: #FAFAFB;
                }

                &.disabled {
                    cursor: not-allowed;
                    opacity: .65;

                }
            }
        }
    }
}

.error-connecting-dialog {
    width: 418px;
    min-height: 453px;
    background: #0E111A;
    border: 1px solid #293249;
    box-shadow: 12px 16px 24px rgba(0, 0, 0, 0.24);
    border-radius: 16px;


    overflow: hidden;
    margin: 0 !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .el-dialog__header {
        padding: 16px;

        .back {
            img {
                cursor: pointer;

            }

        }

        .el-dialog__title {}

        .el-dialog__headerbtn {
            i {
                color: #fff;
                font-size: 20px;
            }
        }
    }

    .el-dialog__body {
        padding: 20px 32px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .warning {
            margin-bottom: 32px;
        }

        .p1 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #FFFFFF;
            margin-bottom: 13px;

        }

        .p2 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            /* or 131% */

            text-align: center;

            color: #FFFFFF;
            margin-bottom: 32px;
        }

        .el-button {
            width: 100%;
            height: 59px;
            background: #4C82FB;
            border-radius: 12px;
            border: 0;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 23px;
            text-align: center;
            color: #F5F6FC;
            margin-bottom: 20px;

            &:hover {
                background: #3371FA;
            }
        }

        .p3 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 600;
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            color: #4C82FB;
            cursor: pointer;

        }
    }

}
</style>