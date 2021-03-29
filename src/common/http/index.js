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

//处理请求取消
const CancelToken = axios.CancelToken;
let cancel = null;
function cancelRequest(url) {
    return new CancelToken(function executor(c) {
        if (c && c.constructor === Function) {
            cancel = c;
            cancel();
            //此请示不太友好，有时页面未请求未完成就跳页了，也会提示
            console.error('来自' + url + ' \n 的请求未发出，已取消');
        }
    });
}
export default {
    POST(url, data) {
        return axios.post(url, data, {
            cancelToken: cancelRequest(url)
        }).then(handleStatus);
    },
    GET(url, params) {
        return axios.get(url, {
            cancelToken: cancelRequest(url),
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(handleStatus);
    },
    DELETE(url, params) {
        return axios.delete(url, {
            cancelToken: cancelRequest(url),
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(handleStatus);
    },
    PUT(url, data) {
        return axios.put(url, data, {
            cancelToken: cancelRequest(url)
        }).then(handleStatus);
    }
};
