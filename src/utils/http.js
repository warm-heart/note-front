import axios from 'axios'
import store from '../store/index'
import globalVal from './global_val'
import router from '../router/index'
import {Loading, Message} from 'element-ui';

// axios 配置
axios.defaults.timeout = 30000 ;
axios.defaults.retry = 0;
axios.defaults.withCredentials = true;

//开始加载动画
let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,.7)',
    });
}

//结束加载动画
function endLoading() {
    loading.close();
}

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.token = store.state.token
        }
        //开始加载
        startLoading();
        return config
    },
    err => {
        return Promise.reject(err)
    },
)


// http response 拦截器
axios.interceptors.response.use(
    response => {
        endLoading();
        return response
    },
    error => {
        endLoading();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    //结束加载
                    endLoading();
                    store.commit(globalVal.LOGOUT);
                    Message.warning({
                        //message: '您好，登录已过期，请重新登录',
                        message: error.response.data.msg,
                        showClose: true,
                        duration: 2000
                    });
                    // 只有在当前路由不是登录页面才跳转
                    router.currentRoute.path !== 'login' &&
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath},
                    });
                    break;
                default:
                    //结束加载
                    endLoading();
                    break;
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    },
)

export default axios