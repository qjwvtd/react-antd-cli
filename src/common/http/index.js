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
    console.log(response);
    if (!response) {
        message.error('网络故障,请检查您的网络');
        return;
    }
    //请求成功
    if (response.status === 200) {
        if (response.data.code === 401) {
            message.error('登录已过期,请重新登录');
        }
        if (response.data.code !== 200) {
            message.error(response.data.msg || '未知异常');
        }
        response.msg = null;
        return response;
    }
    //请求失败
    if (response.status !== 200) {
        const statusArr = [
            { code: 401, message: '请求授权失败' },
            { code: 403, message: '请求不允许' },
            { code: 404, message: '没有发现文件、查询地址或URl' },
            { code: 405, message: 'Request-Line字段定义的方法不允许' },
            { code: 500, message: '服务器内部错误,' + response.statusText },
            { code: 502, message: 'Nginx配置网关受限或超时等,' + response.statusText },
            { code: 503, message: '服务器访问受限,' + response.statusText },
            { code: 504, message: '网关超时,' + response.statusText }
        ];
        for (let i = 0; i < statusArr.length; i++) {
            const item = statusArr[i];
            if (item.code === response.status) {
                return { data: response.data, msg: item.message };
            }
        }
    }
}

function checkCode(res) {
    if (!res) { return; }
    try {
        if (res.msg) {
            message.error(res.msg);
        }
    } catch (error) {
        console.log(error);
    }
    return res.data;
}

export default {
    POST(url, data) {
        return axios.post(url, data, {}).then(checkStatus).then(res => checkCode(res));
    },
    GET(url, params) {
        return axios.get(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res));
    },
    DELETE(url, params) {
        return axios.delete(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res));
    },
    PUT(url, data) {
        return axios.put(url, data, {}).then(checkStatus).then(res => checkCode(res));
    }
};
