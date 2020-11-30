import { message } from 'antd';
import history from '@/common/router';
import { removeToken } from '@/common/utils';
import { recurrence, openErrorView } from './httpUtils';

export function handleStatus(response) {
    let tips = null;//msg
    let data = response.data || { data: null, code: null, msg: null };//data
    if (!response) {
        tips = '网络故障,请检查您的网络';
        message.error(tips);
        openErrorView({ message: tips });
    }
    const requestStatus = response && response.status === 200;
    //请求成功
    if (requestStatus) {
        //处理响应
        if (data.code && data.code === 401) {
            message.error('登录已过期,请重新登录');
            history.push('/login');
            localStorage.clear();
            sessionStorage.clear();
            removeToken();
        }
    }
    //请求失败
    if (!requestStatus) {
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
        tips = statusObj[response.status] || response.statusText || '未知错误';
        tips && message.error(tips);
        data = { data: null, code: response.status, msg: tips };
        if (statusObj[response.status]) {
            let res = null;
            if (typeof response.data === 'object') {
                res = recurrence(response.data, {});
            }
            if (typeof response.data === 'string') {
                res = { message: response.data };
            }
            openErrorView(res);
        }
    }
    return data;
}
