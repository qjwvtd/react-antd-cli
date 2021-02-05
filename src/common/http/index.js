import axios from 'axios';
import { getToken } from '@/common/utils';
//不拦截token的白名单
import whiteList from './httpWhiteRoster';
//处理函数
import { handleStatus } from './handleStatus';
//请求地址
import webRoot from './webRoot';

let baseUrl = webRoot;

//生产环境
if (process.env.NODE_ENV === 'production') {
    if (!baseUrl) {
        baseUrl = window.location.origin;
    }
    axios.defaults.baseURL = baseUrl;
}
//开发环境
if (process.env.NODE_ENV === 'development') {
    //注意:webpack中devSever配置了proxy跨域,不能设置baseurl
    if (process.env.NODE_PROXY) {
        axios.defaults.baseURL = null;
    }
}
//默认10秒超时
axios.defaults.timeout = 10000;

//http request 拦截器
const author = 'Authorization';

axios.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        if (whiteList.indexOf(config.url) === -1) {
            config.headers.common[author] = 'Bearer ' + token;
        }
    }
    return config;
}, error => Promise.reject(error));

//http response 拦截器
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));

export default {
    POST(url, data) {
        return axios.post(url, data, {}).then(handleStatus);
    },
    GET(url, params) {
        return axios.get(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(handleStatus);
    },
    DELETE(url, params) {
        return axios.delete(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(handleStatus);
    },
    PUT(url, data) {
        return axios.put(url, data, {}).then(handleStatus);
    }
};
