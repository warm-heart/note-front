import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import echarts from 'echarts'
import axios from './utils/http'
import VueAxios from "vue-axios";

import "element-ui/lib/theme-chalk/index.css";

import globalVal from './utils/global_val'
import './assets/iconfont/iconfont.css'


import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './assets/commons/css/common.css'
import './assets/commons/js/common'



Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.use(VueQuillEditor);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");


//页面刷新，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit(globalVal.LOGIN, localStorage.getItem("token"))
}
;

router.beforeEach((to, from, next) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            ElementUI.Notification({
                showClose: true,
                message: '您好，请登录',
                type: 'warning',
                duration: 3000
            });
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
});



