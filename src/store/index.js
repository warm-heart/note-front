import Vue from "vue";
import Vuex from "vuex";
import  globalVal from '../utils/global_val'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 1,
        user: {},
        token: "",
        title: '',
    },
    mutations: {
        add(state) {
            state.count = state.count + 1;
        },
        [globalVal.LOGIN]: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        [globalVal.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = "";
        },
        [globalVal.TITLE]: (state, data) => {
            localStorage.token = data;
            state.title = data;
        },
    },
    actions: {},
    modules: {}
});
