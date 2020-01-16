const storageName = require('./storageName.js');
/**
*设置当前项目ID
*@params pid,当前获取的项目ID
*/
export function setCurrentProjectId(pid) {
    sessionStorage.setItem(storageName.currentProjectId, JSON.stringify(pid ? pid : null));
}
/**获取当前项目ID**/
export function getCurrentProjectId() {
    return JSON.parse(sessionStorage.getItem(storageName.currentProjectId));
}
/**
*设置当前用户
*@param obj,object,当前用户基本信息
**/
export function setCurrentUser(obj) {
    sessionStorage.setItem(storageName.currentUserInfo, JSON.stringify(obj || null));
}
/**获取当前用户,返回当前用户*/
export function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem(storageName.currentUserInfo));
}
//获取当前用户ID
export function getCurrentUserId() {
    return getCurrentUser().id;
}
//设置主导航KEY,array
export function setCurrentMenuKeys(keys) {
    sessionStorage.setItem(storageName.currentMenuKeys, JSON.stringify(keys));
}
//获取主导航KEY
export function getCurrentMenuKeys() {
    return JSON.parse(sessionStorage.getItem(storageName.currentMenuKeys));
}
//设置子导航submenu的key
export function setCurrentSubMenuKeys(keys) {
    sessionStorage.setItem(storageName.currentSubmenuKeys, JSON.stringify(keys));
}
//获取子导航submenu的key
export function getCurrentSubMenuKeys() {
    return JSON.parse(sessionStorage.getItem(storageName.currentSubmenuKeys));
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