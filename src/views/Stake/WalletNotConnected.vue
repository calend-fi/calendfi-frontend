<template>
    <div class="wallet-not-connected">
        <div class="inner">
            <h2 class="h2">Please, connect your wallet</h2>
            <p class="p">We couldn’t detect a wallet. Connect a wallet to stake and view your balance.</p>
            <button class="" tabindex="0" type="button">Connect wallet </button>
            <div class="apr flex aic jcc">
                <div class="item flex aic jcsb">
                    <div class="col1 flex aic">
                        <img src="@/assets/imgs/stake/4.svg" alt="">
                        <p class="">AAVE</p>
                    </div>
                    <div class="col2">
                        <p class="p1">Staking APR</p>
                        <p class="p2">6.69<span class="">%</span> </p>
                    </div>
                </div>
                <div class="item flex aic jcsb">
                    <div class="col1 flex aic">
                        <img src="@/assets/imgs/stake/4.svg" alt="">
                        <p class="">AAVE</p>
                    </div>
                    <div class="col2">
                        <p class="p1">Staking APR</p>
                        <p class="p2">6.24<span class="">%</span> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    mixins: [],
    components: {},
    props: {},
    data() {
        return {

        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.wallet-not-connected {
    width: 100%;
    margin: 0 auto;

    .inner {
        padding: 74px 16px 16px;

        height: 356px;
        background: #131823;
        box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.05);
        border-radius: 4px;

        .h2 {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 500;
            font-size: 21px;
            line-height: 28px;
            /* identical to box height, or 133% */
            text-align: center;
            color: #F1F1F3;
            margin-bottom: 8px;
        }

        .p {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 20px;
            /* or 154% */

            text-align: center;
            letter-spacing: 0.15px;

            color: #7E96B8;
            margin-bottom: 24px;
        }

        button {
            display: block;
            margin: 0 auto;
            min-width: 124px;
            height: 36px;
            padding: 6px 12px;
            background: linear-gradient(253.58deg, #69188F 11.38%, #1D48B1 44.59%, #0D88E1 88.62%);
            border-radius: 4px;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            /* identical to box height, or 171% */
            text-align: center;
            color: #FFFFFF;
            cursor: pointer;
            margin-bottom: 30px;
        }

        .apr {
            .item {
                width: 263px;
                height: 68px;
                border: 1px solid #2C3646;
                border-radius: 6px;
                margin: 0 4px;
                padding: 0 16px;

                .col1 {

                    img {
                        width: 24px;
                        margin-right: 8px;
                    }

                    p {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 20px;
                        /* identical to box height, or 143% */

                        letter-spacing: 0.15px;

                        color: #F1F1F3;

                    }
                }

                .col2 {
                    text-align: right;

                    .p1 {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 16px;
                        /* identical to box height, or 133% */

                        text-align: right;
                        letter-spacing: 0.1px;

                        color: #7E96B8;
                    }

                    .p2 {
                        font-family: 'Roboto';
                        font-style: normal;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 20px;
                        /* identical to box height, or 143% */

                        letter-spacing: 0.15px;

                        color: #F1F1F3;

                        span {
                            color: #7E96B8;

                        }
                    }
                }
            }
        }

    }
}
</style>