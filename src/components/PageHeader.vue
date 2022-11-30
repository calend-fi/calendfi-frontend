<template>
    <div class="page-header flex aic jcsb">
        <div class="fl flex aic">
            <h1 class="logo flex aic jcc">
                <img src="@/assets/imgs/page-header/logo.svg" alt="">
            </h1>
            <div class="links flex aic">
                <router-link class="link" to="/dashboard"> Dashboard </router-link>
                <router-link class="link" to="/markets"> Markets </router-link>
                <router-link class="link" to="/staking"> Stake </router-link>
                <router-link class="link" to="/governance"> Governance </router-link>
                <div class="link flex aic jcc" to="/more"> <span>More</span> <img class="arrow-down" src="@/assets/imgs/page-header/arrow-down.svg" alt=""> </div>
            </div>
        </div>
        <div class="fr flex aic">
            <el-button v-if="!walletInfo.address" class="flex aic jcc connect-wallet-btn" @click="showWalletList=true; ">Connect Wallet</el-button>
            <template v-else>
                <div class="chain flex aic">
                    <img :src="netWorkImg[walletInfo.chainId]" alt="" class="icon1">
                    <span class="name">{{chainName[walletInfo.chainId]}}</span>
                    <img src="@/assets/imgs/page-header/2.svg" alt="" class="icon2">
                </div>
                <div class="wallet-info flex aic">
                    <div class="balance">{{$formatUnits(walletInfo.balance,18)|fixedFormatNum(4)}} {{tokenName[walletInfo.chainId]}}</div>
                    <span class="address">{{walletInfo.address|addressFilter}}</span>
                </div>
            </template>
            <div class="more">
                <img src="@/assets/imgs/page-header/3.svg" alt="">
            </div>
        </div>
        <el-dialog title="Connect a wallet" :visible.sync="showWalletList" width="400px" :modal-append-to-body="true" append-to-body custom-class="wallet-list-dialog" :close-on-click-modal="false">
            <div class="wallet-list">
                <div class="wallet-item MetaMask" @click="connectWallet('MetaMask')">
                    <img src="@/assets/imgs/page-header/metamask.svg" alt="">
                    <span class="text">MetaMask</span>
                </div>
                <div class="wallet-item Coinbase" @click="connectWallet('Coinbase')">
                    <img src="@/assets/imgs/page-header/coinbase.svg" alt="">
                    <span class="text">Coinbase Wallet</span>
                </div>
                <div class="wallet-item WalletConnect" @click="connectWallet('WalletConnect')">
                    <img src="@/assets/imgs/page-header/walletconnect.svg" alt="">
                    <span class="text">WalletConnect</span>
                </div>
                <div class="wallet-item Binance" @click="connectWallet('Binance')">
                    <img src="@/assets/imgs/page-header/binance.svg" alt="">
                    <span class="text">Binance</span>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="errorConnecting" width="400px" :modal-append-to-body="true" append-to-body custom-class="error-connecting-dialog" :close-on-click-modal="false">
            <div class="back" slot="title">
                <img src="@/assets/imgs/page-header/back.svg" alt="" @click="backToWalletSelection">
            </div>
            <img src="@/assets/imgs/page-header/warning.svg" alt="" class="warning">
            <div class="p1">Error connecting</div>
            <div class="p2">The connection attempt failed. Please click try again and follow the steps to connect in your wallet.</div>
            <el-button class="try-again">Try Again</el-button>
            <div class="p3" @click="backToWalletSelection">Back to wallet selection</div>
        </el-dialog>
    </div>
</template>
<script>
import { netWorkImg, tokenName, chainName } from "@/web3/common/web3Config.js"

export default {
    name: 'PageHeader',
    watch: {
        '$store.getters.walletInfo.address'(address) {
            if (address) {
                this.showWalletList = false;
            }
        },
        connectWalletStatus(val) {
            if (val == -1) {
                this.showWalletList = false;
                this.errorConnecting = true;

            }
        }
    },
    components: {},
    props: ['connectWalletStatus'],
    data() {
        return {
            netWorkImg: netWorkImg,
            tokenName: tokenName,
            chainName: chainName,
            showWalletList: false,
            errorConnecting: false,


        }
    },
    created() {},
    mounted() {},
    computed: {
        walletInfo() {
            return this.$store.getters.walletInfo;
        },

    },
    methods: {
        connectWallet(type) {
            this.$emit('connectToWallet', type)
        },
        backToWalletSelection() {
            this.$emit('setConnectWalletStatus', 0);
            this.errorConnecting = false;
            this.showWalletList = true;
        }
    },
    filters: {}
}
</script>
<style scoped lang="scss">
.page-header {
    height: 81px;
    padding: 0 50px 0 76px;

    &:after {
        content: "";
        position: absolute;
        height: 1px;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        background: #072B5B;
    }

    .fl {
        .logo {
            img {
                width: 103px;
                height: 31px;
            }

            margin-right: 62px;
        }

        .links {
            .link {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 16px;
                /* identical to box height, or 100% */
                color: #7E96B8;

                &:not(:last-child) {
                    margin-right: 32px;
                }

                &:hover,
                &.router-link-active {
                    color: #FFFFFF;
                }

                .arrow-down {
                    margin-left: 12px;
                }
            }
        }

    }

    .fr {
        white-space: nowrap;

        .connect-wallet-btn {
            border: 0;
            padding: 0;
            min-width: 126px;
            height: 36px;
            background: #3B82F6;
            border-radius: 12px;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            /* identical to box height, or 143% */
            color: #F8FAFC;

        }

        .chain {
            background: #1C2D4A;
            height: 36px;
            border-radius: 12px;
            padding: 0 11px 0 10px;
            cursor: pointer;


            .icon1 {
                width: 20px;
                height: 20px;
                margin-right: 8px;
            }

            .name {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
                /* identical to box height, or 112% */
                color: #FFFFFF;
            }

            .icon2 {
                width: 16px;
                height: 16px;
                margin-left: 5px;
            }
        }

        .wallet-info {
            height: 36px;
            border-radius: 12px;
            padding: 0 4px 0 12px;
            background: #1C2D4A;

            margin-left: 16px;

            .balance {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
                /* identical to box height, or 112% */
                text-align: center;
                color: #FFFFFF;
                margin-right: 7px;
            }

            .address {
                background: #091B36;
                height: 28px;
                line-height: 28px;
                border-radius: 10px;
                padding: 0 12px 0 11px;
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                /* identical to box height */
                color: #FFFFFF;
            }
        }

        .more {
            cursor: pointer;
            width: 42px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            margin-left: 16px;
        }
    }

}
</style>
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
                cursor: not-allowed;
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

                &.Binance {
                    img {
                        width: 34px;
                        margin-right: 8px;

                    }
                }

                &.MetaMask {
                    cursor: pointer;
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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
</style>