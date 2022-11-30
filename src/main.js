import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/common.css'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import { toThousands, formatTime, fixedFormatNum, addressFilter, getDollar, exponentialToNumber,exponentialToNumber1, searchParse } from '@/utils';
import { ethers } from 'ethers';
import ConnectWalletBtn from '@/components/ConnectWalletBtn.vue'

Vue.filter('toThousands', toThousands);
Vue.filter('fixedFormatNum', fixedFormatNum);
Vue.filter('exponentialToNumber', exponentialToNumber);
Vue.filter('exponentialToNumber1', exponentialToNumber1);
Vue.filter('addressFilter', addressFilter);

Object.assign(Vue.prototype, {
    $ethers: ethers,
    $parseUnits: ethers.utils.parseUnits,
    $formatUnits: ethers.utils.formatUnits,
    $BigNumber: ethers.BigNumber,
    $isAddress: ethers.utils.isAddress,
    $formatTime: formatTime,
    getDollar: getDollar,
    $exponentialToNumber: exponentialToNumber,
    $exponentialToNumber1: exponentialToNumber1,
    $searchParse: searchParse,
});




/* import Vconsole from 'vconsole'
let vConsole = new Vconsole()
Vue.use(vConsole)
*/
Vue.use(ElementUI);
Vue.component("ConnectWalletBtn", ConnectWalletBtn)
Vue.config.productionTip = false

window.vm = new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')