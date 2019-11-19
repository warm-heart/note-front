import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");


router.beforeEach((to, from, next) => {
    to.meta.keep = false;
    localStorage.token = 'cooper';
    next();

})

