<template>
    <div>122</div>
</template>
<script>
export default {
    name: 'ConnectWalletBtn',
    props: {
        text: {
            type: String,
        },
        position: {
            type: String
        }
    },
    computed: {

    },
    watch: {

    },
    data() {
        return {

        }
    },
    methods: {

    },
}
</script>
<style scoped lang="scss">
.el-button.connect-wallet-btn {
    min-width: fit-content;

    &:hover {}

    &.is-loading {
        padding: 0 20px !important;

        &:before {}
    }
}
</style>