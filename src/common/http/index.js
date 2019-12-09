import axios from 'axios';
import { message } from 'antd';
import { getToken } from '@/common/utils';
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
    let res = null;
    if (!response) {
        res = { data: { data: null, code: null }, msg: '网络故障,请检查您的网络' };
    }
    //请求成功
    if (response.status === 200) {
        //接口处理成功
        if (response.data.code === 200) {
            response.msg = null;
            res = response;
        }
        //接口处理失败
        if (response.data.code !== 200) {
            res = { data: response.data, msg: response.data.msg };
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
        const errormsg = statusObj[response.status] || '未知错误';
        res = { data: response.data, msg: errormsg };
    }
    //捕获
    try {
        if (res.msg && res.data.code !== 200) {
            message.error(res.msg);
        }
    } catch (error) {
        console.log(error);
    }
    return res.data;
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

