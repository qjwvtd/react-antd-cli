import { message } from 'antd';
import history from '@/common/router';
import { removeToken } from '@/common/utils';
//递归对象
function recurrence(params, obj) {
    if (typeof params === 'object') {
        for (let i in params) {
            const item = params[i];
            if (typeof item === 'string' || typeof item === 'boolean' || typeof item === 'number') {
                obj[i] = item;
            }
            if (typeof item === 'object') {
                recurrence(item, obj);
            }
        }
    }
    return obj;
}
export function handleStatus(response) {
    let errorMsgTips = null;
    if (!response) {
        errorMsgTips = '网络故障,请检查您的网络';
        message.error(errorMsgTips);
        return { data: null, code: null, msg: errorMsgTips };
    }
    //请求失败
    if (response && response.status !== 200) {
        const statusObj = {
            400: '请求语法错误,服务器不理解',
            401: '身份验证授权失败',
            403: '请求不允许,无操作权限',
            404: '没有发现文件、查询地址或URl',
            405: '方法禁用,Request-Line字段定义的方法不允许',
            406: '不接受,无法使用请求的内容特性响应请求的网页',
            407: '需要代理授权',
            408: '请求超时,务器等候请求时发生超时',
            410: '请求的资源已永久删除',
            500: '服务器内部错误,' + response.statusText,
            501: '尚未实施,无法识别的请求方法',
            502: '错误网关,Nginx配置网关受限或超时等,' + response.statusText,
            503: '服务器访问受限,服务不可用,' + response.statusText,
            504: '网关超时,' + response.statusText,
            505: '服务器不支持的HTTP协议,' + response.statusText
        };
        errorMsgTips = statusObj[response.status] || response.statusText || '未知错误';
        return { data: null, code: null, msg: errorMsgTips };
    }
    //请求成功
    if (response && response.status === 200) {
        //token失效
        if (response.data.code === 401) {
            message.error('登录已过期,请重新登录');
            history.push('/login');
            localStorage.clear();
            sessionStorage.clear();
            removeToken();
            return;
        }
        if (response.data.code !== 200 && response.data.code !== 401) {
            errorMsgTips = response.data.msg;
        }
        //登录消息处理1005
        // if (response.data.code === 1005) {
        //     errorMsgTips = '验证码错误';
        // }
        //登录消息处理1006
        // if (response.data.code === 1006) {
        //     errorMsgTips = '用户不存在';
        // }
        //登录消息处理1007
        // if (response.data.code === 1007) {
        //     errorMsgTips = '您的账号密码不匹配，请重新输入密码';
        // }
        //接口处理成功
        if (response.data.code === 200) {
            errorMsgTips = null;
        }
    }
    //捕获
    try {
        if (errorMsgTips) {
            message.error(errorMsgTips);
        }
    } catch (error) {
        console.log(error);
    }
    //请求异常处理
    if (response && response.status !== 200) {
        let res = null;
        if (typeof response.data === 'object') {
            res = recurrence(response.data, {});
        }
        if (typeof response.data === 'string') {
            res = response;
        }
        const path = {
            pathname: '/error',
            state: res
        };
        history.push(path);
    }
    //处理null值
    function handleNull(data) {
        if (!data) { return; }
        for (let i in data) {
            if (data[i] === null) {
                data[i] = '--';
            }
            if (typeof data[i] === 'object') {
                handleNull(data[i]);
            }
        }
        return data;
    }
    return handleNull(response.data);
}
