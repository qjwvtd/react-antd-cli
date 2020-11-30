import { message } from 'antd';
import history from '@/common/router';
import { removeToken } from '@/common/utils';
import { recurrence, openErrorView, handleNull, status } from './httpUtils';
export function handleStatus(response) {
    let tips = null;//msg
    let data = response.data || { data: null, code: null, msg: null };//data
    if (!response) {
        tips = '网络故障,请检查您的网络';
        message.error(tips);
        openErrorView({ message: tips });
    }
    //请求直接报错
    if (typeof response === 'string') {
        openErrorView({ message: response });
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
        tips = status[response.status] || response.statusText || '未知错误';
        tips && message.error(tips);
        data = { data: null, code: response.status, msg: tips };
        if (status[response.status]) {
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
    return handleNull(data);
}
