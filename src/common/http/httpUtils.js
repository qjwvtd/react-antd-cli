import router from '@/common/router';
//递归对象
export function recurrence(params, obj) {
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
//处理null值,把null值变成{}
export function handleNull(data) {
    if (!data) { return; }
    for (let i in data) {
        if (typeof data[i] === 'object') {
            handleNull(data[i]);
        }
        if (data[i] === null) {
            data[i] = {};
        }
    }
    return data;
}
//请求异常,跳转到error组件
export function openErrorView(data) {
    const path = {
        pathname: '/error',
        state: data
    };
    router.push(path);
}
//请求状态码
export const status = {
    400: '请求语法错误,服务器不理解',
    401: '身份验证授权失败',
    403: '请求不允许,无操作权限',
    404: '没有发现文件、查询地址或URl',
    405: '方法禁用,Request-Line字段定义的方法不允许',
    406: '不接受,无法使用请求的内容特性响应请求的网页',
    407: '需要代理授权',
    408: '请求超时,务器等候请求时发生超时',
    410: '请求的资源已永久删除',
    500: '服务器内部错误',
    501: '尚未实施,无法识别的请求方法',
    502: '错误网关,Nginx配置网关受限或超时等',
    503: '服务器访问受限,服务不可用',
    504: '网关超时',
    505: '服务器不支持的HTTP协议'
};
