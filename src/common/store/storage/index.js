import constant from '@/common/utils/constant.js';
/**
*设置当前项目ID
*@params pid,当前获取的项目ID
*/
export function setCurrentProjectId(pid) {
    sessionStorage.setItem(constant.storage.currentProjectId, JSON.stringify(pid ? pid : null));
}
/**获取当前项目ID**/
export function getCurrentProjectId() {
    return JSON.parse(sessionStorage.getItem(constant.storage.currentProjectId));
}
/**
 * 设置当前用户类型[正式用户还是试用用户]
 * @params type,1试用用户,2正式用户
 * **/
export function setCurrentUserType(type) {
    if (!type) {
        throw new Error('缺少必要参数,当前用户类型');
    }
    const data = { type: type, description: type === 1 ? '试用用户' : type === 2 && '正式用户' };
    sessionStorage.setItem(constant.storage.currentUserType, JSON.stringify(data));
}
/**获取当前用户类型[正式用户还是试用用户]**/
export function getCurrentUserType() {
    return JSON.parse(sessionStorage.getItem(constant.storage.currentUserType));
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