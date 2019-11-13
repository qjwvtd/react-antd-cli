import axios from 'axios';

//生产环境url
// const productionUrl = 'http://www.baidu.com';
//开发环境baseurl
// const CORSUrl = process.env.NODE_ENV === "development" ? '/api/' : productionUrl;

// const service = axios.create({
//     baseURL: CORSUrl, // api 的 base_url
//     timeout: 10000 // request timeout
// });
const author = 'Authorization';
const token = 'e47503c9-86a5-4970-94dc-67b6c6ca3aa3';
axios.interceptors.request.use(config => {
    if (token) {
        config.headers.common[author] = 'Bearer' + token;
        // const whiteList = store.getters.whiteList;
        // if (whiteList.indexOf(getHashPath()) !== -1) {
        //     delete config.headers.common[author];
        //     // 单独处理 "./api/enterprise/v1/company/add" 接口
        //     if (config.url === './api/enterprise/v1/company/add') {
        //         config.headers.common[author] = 'Bearer' + token;
        //     }
        // }
    }
    return config;
}, error => Promise.reject(error));

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
