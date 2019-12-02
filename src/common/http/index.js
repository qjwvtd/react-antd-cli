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
    if (!response) {
        message.error('网络故障,请检查您的网络');
        return;
    }
    if (response.status === 200 || response.status === 304) {
        if (response.data.code === 401) {
            message.error('登录已过期,请重新登录');
        }
        if (response.data.code !== 200) {
            message.error(response.data.msg || '未知异常');
        }
        return response;
    }
    if (response.status === 401) {
        message.error('请求授权失败');
    }
    if (response.status === 401) {
        message.error('请求授权失败');
    }
    if (response.status === 403) {
        message.error('请求不允许');
    }
    if (response.status === 404) {
        message.error('没有发现文件、查询或URl');
    }
    if (response.status === 405) {
        message.error('Request-Line字段定义的方法不允许');
    }
    if (response.status >= 500) {
        message.error('服务器内部错误,' + response.statusText);
    }
    if (response.status === 504) {
        message.error('网关超时,' + response.statusText);
    }
}

function checkCode(res, errMsg) {
    if (!res) { return; }
    if (!res.status) {
        switch (res.data.data.code) {
        case 1:
            message.error(res.data.data.msg || '参数异常');
            break;
        case 2:
            message.error('未登录！');
            break;
        case 3:
            message.error('没有权限');
            break;
        default:
            errMsg ? message.error(errMsg) : message.error(res.data.message || '未知异常');
        }
    }
    return res.data;
}

export default {
    POST(url, data, errMsg) {
        return axios.post(url, data, {}).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    GET(url, params, errMsg) {
        return axios.get(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    DELETE(url, params, errMsg) {
        return axios.delete(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    PUT(url, data, errMsg) {
        return axios.put(url, data, {}).then(checkStatus).then(res => checkCode(res, errMsg));
    }
};
