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
