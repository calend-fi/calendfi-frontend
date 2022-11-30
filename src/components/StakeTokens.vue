<template>
    <div class="stake-token flex aic jcsb">
        <!-- stake token -->
        <el-dialog class="stake-token-dialog" :visible.sync="stakeDialog" :modal-append-to-body="false" :show-close="false">
            <div slot="title" class="el-dialog__header__inner">
                <span class="el-dialog__title">
                    Stake LP tokens
                </span>
                <img src="@/assets/imgs/stake/close.svg" alt="" class="close-svg">
            </div>
            <div class="stake">
                <div class="row1 flex aic jcsb">
                    <div class="label">Stake</div>
                    <div class="balance">Balance:0</div>
                </div>
                <div class="row2 flex aic jcsb">
                    <el-input @input="onInput('stakeVal')" class="fl" placeholder="0.0" v-model="stakeVal"></el-input>
                    <div class="fr flex aic">
                        <el-button class="max">Max</el-button>
                        <span class="text">CHE-OKT</span>
                    </div>
                </div>
            </div>
            <div class="tips">No tokens to stake get CHE-OKT </div>
            <div class="btns">
                <el-button class="cancel">Cancel</el-button>
                <el-button class="confirm">Confirm</el-button>
            </div>
            <div class="get-coin flex aic jcc">
                <img src="@/assets/imgs/stake/share.svg" alt="" class="img">
                <span class="text">Get CHE-OKT</span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { formatNumber } from '@/utils'

export default {
    name: 'StakeToken',
    watch: {},
    props: {

    },
    data() {
        return {
            stakeDialog: false,
            stakeVal: "",

        }
    },
    computed: {

    },
    methods: {
        onInput(type) {
            this[type] = formatNumber(this[type], true);
            // this.isIllegal = true;
            // try {
            //     this.$parseUnits('0' + this[type], this.activityInfo.stakedTokenDecimals);
            // } catch {
            //     this.isIllegal = false;
            // }
        },
    },
    filters: {

    }
}
</script>
<style scoped lang="scss">
.stake-token {

    .stake-token-dialog {
        ::v-deep .el-dialog {
            width: 343px;
            height: 305px;
            background: #0E111A;
            border: 1px solid #293249;
            box-shadow: 12px 16px 24px rgba(0, 0, 0, 0.24);
            border-radius: 16px;
            padding: 0 16px;

            .el-dialog__header {
                height: 55px;
                align-items: center;
                justify-content: space-between;
                display: flex;
                padding: 0;

                .el-dialog__header__inner {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;

                    img {
                        cursor: pointer;
                    }
                }



                .el-dialog__title {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 18px;
                    /* identical to box height */


                    color: #FFFFFF;
                }


            }

            .el-dialog__body {
                padding: 0;

                .stake {
                    height: 100px;
                    background: #060A10;
                    border: 1px solid #2C2F36;
                    border-radius: 12px;

                    .row1 {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 19px;
                        /* identical to box height */
                        text-align: center;
                        color: #FFFFFF;
                        padding: 16px;

                        .label {}

                        .balance {}
                    }

                    .row2 {
                        padding: 9px 16px 10px;

                        .fl {
                            flex: 1;

                            input {
                                border: 0;
                                padding: 0 16px 0 0;
                                font-family: DM Sans;
                                font-style: normal;
                                font-weight: 500;
                                font-size: 16px;
                                line-height: 30px;
                                background: transparent;
                                height: 30px;
                                color: #fff;
                            }

                            input::placeholder {
                                font-family: DM Sans;
                                font-style: normal;
                                font-weight: normal;
                                font-size: 16px;
                                line-height: 30px;
                            }
                        }

                        .fr {
                            .max {

                                width: 56px;
                                height: 30px;
                                border: 1px solid #48A2F8;
                                border-radius: 8px;
                                font-family: 'Helvetica';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 28px;
                                /* identical to box height, or 175% */
                                text-align: center;
                                color: #48A2F8;
                                padding: 0;
                                background: transparent;

                                &:hover,
                                &.ac {}
                            }

                            .text {
                                font-family: 'Roboto';
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 19px;
                                /* identical to box height */
                                text-align: center;
                                color: #FFFFFF;
                                margin-left: 16px;
                            }
                        }
                    }
                }

                .tips {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    line-height: 20px;
                    /* identical to box height, or 143% */
                    color: #7E96B8;
                    padding: 8px 0 16px;
                    cursor: pointer;

                }

                .btns {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .el-button {
                        width: 152px;
                        height: 40px;
                        background: #1C2D4A;
                        border-radius: 12px;
                        border: 0;
                    }

                    .cancel {
                        text-align: center;
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 16px;
                        color: #FFFFFF;

                    }

                    .confirm {
                        background: #324054;
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 16px;
                        text-align: center;
                        color: #6C86AD;

                        &.ac {

                            &:hover {}
                        }
                    }
                }

                .get-coin {
                    cursor: pointer;
                    margin-top: 24px;

                    .img,
                    svg {
                        width: 18px;
                        height: 18px;
                        margin-right: 8px;

                        path {}
                    }

                    .text {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 10px;
                        /* identical to box height, or 71% */


                        color: #48A2F8;



                    }
                }



            }
        }
    }



}
</style>