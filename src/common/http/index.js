import axios from 'axios';

//生产环境
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'http://www.baidu.com';
}
//开发环境
if (process.env.NODE_ENV === 'development') {
    //注意:webpack中devSever配置了proxy跨域,不能设置baseurl
    if (process.env.NODE_PROXY) {
        axios.defaults.baseURL = null;
    }
}
axios.defaults.timeout = 10000;

//http request 拦截器
const author = 'Authorization';
// const token = 'db2c4808-450b-4382-bcde-5844da36efda';
axios.interceptors.request.use(config => {
    // if (token) {
    //     config.headers.common[author] = 'Bearer' + token;
    // }
    return config;
}, error => Promise.reject(error));

//http response 拦截器
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response));

function checkStatus (response) {
    if (!response) {
        alert('网络故障,请检查您的网络');
        return;
    }
    if (response.status === 200 || response.status === 304) {
        if (response.data.code === 401) {
            alert('登录已过期,请重新登录');
        }
        if (response.data.code !== 200) {
            alert(response.data.msg || '未知异常');
        }
        if (response.data.data.constructor === Array && response.data.data.length === 0) {
            alert('暂无数据');
        }
        if (response.data.data.constructor === Object && JSON.stringify(response.data.data) === '{}') {
            alert('暂无数据');
        }
        return response;
    }
    if (response.status === 401) {
        alert('请求授权失败');
    }
    if (response.status === 401) {
        alert('请求授权失败');
    }
    if (response.status === 403) {
        alert('请求不允许');
    }
    if (response.status === 404) {
        alert('没有发现文件、查询或URl');
    }
    if (response.status === 405) {
        alert('Request-Line字段定义的方法不允许');
    }
    if (response.status >= 500) {
        alert('服务器内部错误,' + response.statusText);
    }
    if (response.status === 504) {
        alert('网关超时,' + response.statusText);
    }
}

function checkCode (res, errMsg) {
    if (!res) { return; }
    if (!res.status) {
        console.log(res.data);
        switch (res.data.data.code) {
        case 1:
            alert(res.data.data.msg || '参数异常');
            break;
        case 2:
            alert('未登录！');
            break;
        case 3:
            alert('没有权限');
            break;
        default:
            errMsg ? alert(errMsg) : alert(res.data.message || '未知异常');
        }
    }
    return res.data;
}

export default {
    POST (url, data, errMsg) {
        return axios.post(url, data, {}).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    GET (url, params, errMsg) {
        return axios.get(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    DELETE (url, params, errMsg) {
        return axios.delete(url, {
            params: {
                _t: +(new Date()),
                ...params
            }
        }).then(checkStatus).then(res => checkCode(res, errMsg));
    },
    PUT (url, data, errMsg) {
        return axios.put(url, data, {}).then(checkStatus).then(res => checkCode(res, errMsg));
    }
};
