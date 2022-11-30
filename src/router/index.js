import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/staking',
        component: () => import('../components/layout.vue'),
        children: [{
            path: 'staking',
            component: () => import('../views/Stake/Index.vue'),
        }],
    },
    {
        path: '/*',
        redirect: '/staking'
    }
];

const router = new VueRouter({
    routes
});




// @ts-ignore
window.getCalendVersion = version => {
    if (!localStorage.getItem('calendVersion') || localStorage.getItem('calendVersion') !== version) {
        window.localStorage.clear();
        localStorage.setItem('calendVersion', version);
        window.location.reload(true);
    }
}

router.beforeEach((to, from, next) => {



    const versionScriptDom = document.querySelector('script[src*="calendVersion.js?v="]');
    versionScriptDom && versionScriptDom.remove();

    const versionScript = document.createElement("script");
    versionScript.src = (location.href.split("#")[0]).split("index.html")[0] + 'calendVersion.js?v=' + new Date().getTime();
    const s = document.querySelector("script");
    s.parentNode.insertBefore(versionScript, s);

    next();
});








export default router