import axios from 'axios';
import { message } from 'antd';
import rotes from '@/common/router';
import { getToken, removeToken } from '@/common/utils';

//请求地址
const __BASEURL = require('./../../../package.json').baseURL;
//不拦截的白名单
const whiteList = require('./httpWhiteRoster.js');

//生产环境
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = __BASEURL;
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

function checkStatus(response) {
    let errorMsgTips = null;
    if (!response) {
        errorMsgTips = '网络故障,请检查您的网络';
        message.error(errorMsgTips);
        return { data: null, code: null, msg: errorMsgTips };
    }
    //token失效
    if (response.data.code === 401) {
        message.error('登录已过期,请重新登录');
        rotes.push('/login');
        localStorage.clear();
        sessionStorage.clear();
        removeToken();
        return;
    }
    //请求成功
    if (response.status === 200) {
        //接口处理成功
        if (response.data.code === 200) {
            errorMsgTips = null;
        }
        //接口处理失败
        if (response.data.code !== 200) {
            errorMsgTips = response.data.msg || '接口处理失败,code:' + response.data.code + ',未知错误';
        }
        //登录消息处理1005
        if (response.data.code === 1005) {
            errorMsgTips = '验证码错误';
        }
        //登录消息处理1006
        if (response.data.code === 1006) {
            errorMsgTips = '用户不存在';
        }
        //登录消息处理1007
        if (response.data.code === 1007) {
            errorMsgTips = '您的账号密码不匹配，请重新输入密码';
        }
    }
    //请求失败
    if (response.status !== 200) {
        const statusObj = {
            401: '请求授权失败',
            403: '请求不允许,无操作权限',
            404: '没有发现文件、查询地址或URl',
            405: 'Request-Line字段定义的方法不允许',
            500: '服务器内部错误,' + response.statusText,
            502: 'Nginx配置网关受限或超时等,' + response.statusText,
            503: '服务器访问受限,' + response.statusText,
            504: '网关超时,' + response.statusText
        };
        errorMsgTips = statusObj[response.status] || '未知错误';
    }
    //捕获
    try {
        if (errorMsgTips) {
            message.error(errorMsgTips);
        }
    } catch (error) {
        console.log(error);
    }
    return response.data;
}

export default {
    POST(url, data) {
        return axios.post(url, data, {}).then(checkStatus);
    },
    GET(url, params) {
        return axios.get(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus);
    },
    DELETE(url, params) {
        return axios.delete(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus);
    },
    PUT(url, data) {
        return axios.put(url, data, {}).then(checkStatus);
    }
};
