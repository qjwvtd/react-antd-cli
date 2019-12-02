import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

//token,get
export function getToken() {
    return Cookies.get(TokenKey);
    //记住功能先留着
    // const isremember = localStorage.getItem('REMEMBER');
    // if (isremember === 'true') {
    //     return Cookies.get(TokenKey);
    // }
    // if (isremember === 'false') {
    //     return sessionStorage.getItem(TokenKey);
    // }
}
//token,set
export function setToken(token) {
    Cookies.set(TokenKey, token, { expires: 0.5 });//days 0.5,半天12小时
    //记住功能先留着
    // const isremember = localStorage.getItem('REMEMBER');
    // if (isremember === 'true') {
    //     Cookies.set(TokenKey, token, { expires: 0.5 });//days 0.5,半天12小时
    // }
    // if (isremember === 'false') {
    //     sessionStorage.setItem(TokenKey, token);
    // }
}
//token,rm
export function removeToken() {
    sessionStorage.removeItem(TokenKey);
    return Cookies.remove(TokenKey);
}
export function setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    let obj = JSON.parse(window.localStorage.getItem(key));
    if (obj && obj !== 'undefined' && obj !== 'null') {
        return obj;
    }
    return '';
}

export function removeLocalStorage(key) {
    if (key) {
        window.localStorage.removeItem(key);
    } else {
        for (let i in arguments) {
            window.localStorage.removeItem(arguments[i]);
        }
    }
}
export function setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key) {
    let obj = window.sessionStorage.getItem(key);
    if (obj && obj !== 'undefined' && obj !== 'null') {
        return JSON.parse(obj);
    }
    return '';
}

export function removeSessionStorage(key) {
    if (key) {
        window.sessionStorage.removeItem(key);
    } else {
        for (let i in arguments) {
            window.sessionStorage.removeItem(arguments[i]);
        }
    }
}
//uuid
export function getUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
//深拷贝
export function deepClone(source, key) {
    const targetObj = source.constructor === Array ? [] : {};
    for (const keys in source) {
        if (source.hasOwnProperty(keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                targetObj[keys] = deepClone(source[keys], key);
            } else {
                if (keys === 'name' && key) {
                    targetObj.label = source.name;
                } else {
                    targetObj[keys] = source[keys];
                }

            }
        }
    }
    return targetObj;
}
//解析路由取参
export function urlParse() {
    const url = window.location.search;
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg);
    if (arr) {
        arr.forEach((item) => {
            const tempArr = item.substr(1).split('=');
            const key = decodeURIComponent(tempArr[0]);
            const val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}
/**
 * 防抖函数
 * 只需要在事件触发的第一行调用,如:
 * shakePrevent()
 * @param delay,延迟毫秒,可不传,默认3000
 */
export function shakePrevent(delay) {
    const e = event;
    const _delay = delay ? delay : 3000;
    function getTarget(target) {
        //已到顶层,非button和input类型的按钮
        if (['BODY', 'HTML', '#document'].indexOf(target.nodeName) >= 0) {
            console.log('非button和input类型的按钮,无法设置防抖');
            return e.target;
        }
        const flag = target.nodeName === 'BUTTON' || target.nodeName === 'INPUT';
        return flag ? target : getTarget(target.parentNode);
    }
    const _target = getTarget(e.target);
    _target.disabled = true;
    setTimeout(() => {
        _target.disabled = false;
    }, _delay);
}
/**
 * 获取指定的URL参数值
 * URL:http://www.quwan.com/index?name=tyler
 * 参数：paramName URL参数
 * 调用方法:getUrlParam("name")
 * 返回值:tyler
 */
export function getUrlParam(paramName) {
    const str = window.location.hash;
    const xh = str.indexOf('?');
    const query = str.substr(xh + 1, str.length);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (pair[0] === paramName) {
            return pair[1];
        }
    }
    return false;
}