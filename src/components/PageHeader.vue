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
            <el-button v-if="!walletInfo.address" class="flex aic jcc connect-wallet-btn" @click="$store.commit('setShowWalletListDialogValue', true)">Connect Wallet</el-button>
            <template v-else>
                <div class="chain flex aic">
                    <img src="@/assets/imgs/page-header/1.svg" alt="" class="icon1">
                    <span class="name">Cardano</span>
                    <img src="@/assets/imgs/page-header/2.svg" alt="" class="icon2">
                </div>
                <div class="wallet-info flex aic">
                    <div class="balance">{{$formatUnits(walletInfo.balance[0].quantity,6)}} ADA</div>
                    <span class="address">{{walletInfo.address|addressFilter}}</span>
                </div>
            </template>
            <div class="more">
                <img src="@/assets/imgs/page-header/3.svg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PageHeader',
    watch: {


    },
    components: {},
    props: ['connectWalletStatus'],
    data() {
        return {
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
            cursor: default;


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