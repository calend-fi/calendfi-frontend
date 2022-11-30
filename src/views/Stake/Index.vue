<template>
    <div class="container staking">
        <div class="container-label flex aic">
            <div class="img-box flex aic jcc">
                <img src="@/assets/imgs/stake/1_1.svg" alt="">
            </div>
            <!-- todo img -->
            <span>Staking</span>
        </div>
        <div class="stake-global-info flex aic ">
            <div class="total-staked flex aic">
                <div class="img-box flex aic jcc">
                    <img src="@/assets/imgs/stake/2_1.svg" alt="">
                </div>
                <div class="col">
                    <div class="label">Total Staked</div>
                    <div class="val">
                        <span class="symbol">$&nbsp;</span>
                        <span class="text">303.37M</span>
                    </div>
                </div>
            </div>
            <div class="total-emission-per-day flex aic">
                <div class="img-box flex aic jcc">
                    <img src="@/assets/imgs/stake/3_1.svg" alt="">
                </div>
                <div class="col">
                    <div class="label">Total emission per day</div>
                    <div class="val">
                        <span class="text">1,100.00</span>
                        <span class="symbol">&nbsp;ADA</span>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="walletInfo.address">
            <div class="stake">
                <div class="tabs flex aic ">
                    <div class="tab-item f1 flex aic jcc " :class="{'ac':stakeIndex==0}" @click="stakeIndex=0"><span class="text">Stake ADA</span></div>
                    <div class="tab-item f1 flex aic jcc" :class="{'ac':stakeIndex==1}" @click="stakeIndex=1"><span class="text">Stake ADA-USDT</span></div>
                </div>
                <div class="inner flex aic jcsb">
                    <div class="stake-item" :class="{'show':stakeIndex==0}">
                        <div class=" stake-item-label">Stake {{'ADA'}}</div>
                        <div class="stake-info flex aic jcsb">
                            <div class="col1 flex aic">
                                <img src="@/assets/imgs/stake/4.svg" alt="" class="img1">
                                <img src="@/assets/imgs/stake/4.svg" alt="" class="img2">
                                <span class="text">ADA</span>
                            </div>
                            <div class="col2">
                                <div class="apr">Staking APR</div>
                                <div class="val">6.69 <span class="symbol">%</span> </div>
                            </div>
                            <div class="col3">
                                <div class="balance">Wallet Balance</div>
                                <div class="val">0</div>
                            </div>
                            <div class="col4 flex aic">
                                <span class="text">View Contract</span>
                                <img src="@/assets/imgs/stake/5.svg" alt="">
                            </div>
                        </div>
                        <div class="stake-claim flex aic jcsb">
                            <div class="stake-claim-item">
                                <div class="label">Staked ADA</div>
                                <div class="val">
                                    <div class="p1">100</div>
                                    <div class="p2 price">$259.00</div>
                                </div>
                                <div class="btn flex aic jcc stake-btn">Stake</div>
                            </div>
                            <div class="stake-claim-item stake-claim-item2">
                                <div class="label">Claimable CAL</div>
                                <div class="val">
                                    <div class="p1">1223</div>
                                    <div class="p2 price">$30.00</div>
                                </div>
                                <div class="btn flex aic jcc claim-btn">Claim</div>
                            </div>
                        </div>
                    </div>
                    <div class="stake-item stake-item-2" :class="{'show':stakeIndex==1}">
                        <div class=" stake-item-label">Stake {{'ADA-USDT'}}</div>
                        <div class="stake-info flex aic jcsb">
                            <div class="col1 flex aic">
                                <img src="@/assets/imgs/stake/4.svg" alt="" class="img1">
                                <img src="@/assets/imgs/stake/4.svg" alt="" class="img2">
                                <span class="text">ADA</span>
                            </div>
                            <div class="col2">
                                <div class="apr">Staking APR</div>
                                <div class="val">6.69 <span class="symbol">%</span> </div>
                            </div>
                            <div class="col3">
                                <div class="balance">Wallet Balance</div>
                                <div class="val">0</div>
                            </div>
                            <div class="col4 flex aic">
                                <span class="text">View Contract</span>
                                <img src="@/assets/imgs/stake/5.svg" alt="">
                            </div>
                        </div>
                        <div class="stake-claim flex aic jcsb">
                            <div class="stake-claim-item disabled">
                                <div class="label">Staked ADA</div>
                                <div class="val">
                                    <div class="p1">100</div>
                                    <div class="p2 price">$259.00</div>
                                </div>
                                <div class="btn flex aic jcc stake-btn">Stake</div>
                            </div>
                            <div class="stake-claim-item stake-claim-item2 disabled">
                                <div class="label">Claimable CAL</div>
                                <div class="val">
                                    <div class="p1">1223</div>
                                    <div class="p2 price">$30.00</div>
                                </div>
                                <div class="btn flex aic jcc claim-btn">Claim</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <wallet-not-connected v-else></wallet-not-connected>
        <stake-token></stake-token>
    </div>
</template>
<script>
import WalletNotConnected from './WalletNotConnected.vue'
import StakeToken from '@/components/StakeTokens'


export default {
    name: 'Staking',
    mixins: [],
    components: {
        WalletNotConnected,
        StakeToken

    },
    props: {},
    data() {
        return {
            stakeIndex: 0,
        }
    },
    computed: {
        walletInfo() {
            return this.$store.getters.walletInfo;
        },
    },
    watch: {},
    filters: {

    },
    created() {},
    mounted() {},
    destroyed() {

    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.container.staking {
    padding-top: 48px;
    margin: 0 auto;

    .container-label {
        margin-bottom: 24px;

        .img-box {
            width: 32px;
            height: 32px;
            margin-right: 8px;
            background: url(../../assets/imgs/stake/1.svg) no-repeat top center;
            background-size: contain;

            img {
                width: 18px;
                height: 13px;
            }
        }


        span {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-size: 32px;
            line-height: 38px;
            /* identical to box height */
            color: #F1F1F3;

        }
    }


    .stake-global-info {
        margin-bottom: 36px;

        .total-staked,
        .total-emission-per-day {
            .img-box {
                background: #1C2D4A;
                border: 1px solid rgba(235, 235, 237, 0.12);
                box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05);
                border-radius: 12px;
                margin-right: 12px;
                width: 42px;
                height: 42px;

                img {
                    width: 22px;
                }
            }


            .col {
                .label {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    /* or 143% */
                    color: #7E96B8;

                }

                .val {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 21px;
                    line-height: 28px;

                    /* identical to box height, or 133% */
                    .symbol {
                        color: #7E96B8;
                    }

                    .text {
                        color: #F1F1F3;
                    }
                }
            }
        }

        .total-staked {
            margin-right: 100px;
        }
    }

    .stake {
        .tabs {
            width: 359px;
            height: 54px;
            left: 247px;
            top: 752px;
            background: #131823;
            border: 1px solid #2C3646;
            border-radius: 4px;
            margin-bottom: 16px;
            padding: 5px;

            .tab-item {
                height: 100%;
                cursor: pointer;

                .text {}

                &.ac {
                    background: #FFFFFF;
                    border: 1px solid rgba(235, 235, 239, 0.12);
                    border-radius: 4px;
                    cursor: default;

                    .text {
                        background: linear-gradient(253.58deg, #69188F 11.38%, #1D48B1 44.59%, #0D88E1 88.62%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-fill-color: transparent;
                    }
                }
            }


        }

        .inner {
            .stake-item {
                flex: 1;
                height: 356px;
                background: #131823;
                box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                padding: 24px;

                display: none;

                .stake-item-label {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 29px;
                    /* identical to box height, or 161% */
                    color: #F1F1F3;
                    margin-bottom: 32px;
                }

                .stake-info {
                    height: 70px;
                    border: 1px solid #2C3646;
                    border-radius: 6px;
                    padding: 0 16px;
                    margin-bottom: 16px;

                    .col1 {
                        img {
                            width: 32px;
                            height: 32px;
                        }

                        .img1 {}

                        .img2 {
                            margin-left: -12px;
                        }

                        .text {
                            margin-left: 8px;
                        }
                    }

                    .col2 {
                        .apr {
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 500;
                            font-size: 12px;
                            line-height: 16px;
                            /* identical to box height, or 133% */


                            color: #7E96B8;

                        }

                        .val {

                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 20px;
                            /* identical to box height, or 143% */

                            letter-spacing: 0.15px;

                            color: #F1F1F3;

                            .symbol {
                                color: #7E96B8;

                            }
                        }
                    }

                    .col3 {
                        .balance {
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 500;
                            font-size: 12px;
                            line-height: 16px;
                            /* identical to box height, or 133% */


                            color: #7E96B8;
                        }

                        .val {
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 20px;
                            /* identical to box height, or 143% */

                            letter-spacing: 0.15px;

                            color: #F1F1F3;
                        }
                    }

                    .col4 {
                        cursor: pointer;

                        .text {
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 24px;
                            /* identical to box height, or 171% */

                            text-align: center;

                            color: #F1F1F3;
                            margin-right: 9px;
                        }

                        img {
                            width: 14px;
                            height: 14px;
                        }
                    }
                }

                .stake-claim {
                    .stake-claim-item {
                        flex: 1;
                        height: 160px;
                        border: 1px solid #2C3646;
                        border-radius: 6px;
                        padding: 16px;
                        text-align: center;

                        .label {
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 14px;
                            line-height: 20px;
                            /* or 143% */

                            letter-spacing: 0.15px;

                            color: #7E96B8;
                            margin-bottom: 3px;
                        }

                        .val {
                            margin-bottom: 24px;

                            .p1 {
                                font-family: 'Roboto';
                                font-style: normal;
                                font-weight: 500;
                                font-size: 21px;
                                line-height: 28px;
                                /* identical to box height, or 133% */
                                color: #FFFFFF;
                            }


                            .p2 {
                                font-family: 'Roboto';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 16px;
                                /* identical to box height, or 133% */


                                color: #FFFFFF;

                            }
                        }

                        .btn {
                            width: 100%;
                            height: 36px;
                            background: #1C2D4A;
                            border-radius: 4px;
                            font-family: 'Roboto';
                            font-style: normal;
                            font-weight: 500;
                            font-size: 14px;
                            line-height: 24px;
                            /* identical to box height, or 171% */
                            text-align: center;
                            color: #5599FF;


                            &:hover {
                                background: #2172E5;
                                color: #fff;
                            }

                            &.stake-btn {}

                            &.claim-btn {}


                        }

                        &.disabled {
                            .label {
                                color: #7E96B8;
                            }

                            .val {
                                .p1 {
                                    color: #8E92A3;


                                }

                                .p2 {
                                    color: #8E92A3;
                                }
                            }

                            .btn {
                                background: #324054;
                                color: #6C86AD;
                            }
                        }

                        &.stake-claim-item2 {
                            margin-left: 16px;
                        }
                    }
                }

                &.show {
                    display: block;
                }

                &.stake-item-2 {
                    margin-left: 16px;

                    &.show {
                        margin-left: 0;
                    }
                }
            }
        }
    }
}

@media (min-width: 0px) {
    .container.staking {
        padding-left: 8px;
        padding-right: 8px;
    }
}

@media (min-width: 640px) {
    .container.staking {
        padding-left: 20px;
        padding-right: 20px;
    }
}

@media (min-width: 760px) {
    .container.staking {
        padding-left: 48px;
        padding-right: 48px;
    }
}

@media (min-width: 960px) {
    .container.staking {
        padding-left: 96px;
        padding-right: 96px;
    }
}

@media (min-width: 1280px) {
    .container.staking {
        max-width: 1280px;
        padding-left: 20px;
        padding-right: 20px;

        .stake {
            .tabs {
                display: none;
            }

            .inner {
                .stake-item {
                    display: block;

                    &.stake-item-2 {
                        margin-left: 16px;

                        &.show {
                            margin-left: 16px;
                        }
                    }
                }
            }
        }
    }
}

@media (min-width: 1440px) {
    .container.staking {
        max-width: unset;
        padding-left: 96px;
        padding-right: 96px;
    }
}

@media (min-width: 1800px) {
    .container.staking {
        max-width: 1440px;
        padding-left: 0px;
        padding-right: 0px;
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
//
//
//
//
//
//
//
</style>