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

//uuid
export function getUUid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
    const str = window.location.search;
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
/**
 * react阻止当前事件冒泡
 * @param e,当前事件触发的事件对象,调用:stopeEventPropagation(e)
*/
export function stopeEventPropagation(e) {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
}
/**文本框chang事件防抖类
 * @param fn,写自己的处理逻辑
 * @param delay,延迟多少毫秒拿到结果,默认2000
 * @param value,文本框输入的值
 * debounce.init(fn, delay)(value);
 * 如:debounce.init(() => {console.log('在这里写请求')}, 1000)('文本框输入的值');
 **/
export const debounce = {
    timerId: null,
    init(fn, delay) {
        return (...parms) => {
            let args = parms;
            if (this.timerId) { clearTimeout(this.timerId); }
            this.timerId = setTimeout(() => {
                fn.apply(this, args);
            }, delay || 2000);//默认2秒
        };
    }
};
/**
*根据key,value,从树里面找到一个节点,return当前节点
*@param treeList,标准的树型结构,必须要有children字段
*@param key,查询的关键属性
*@param value,key的值
*如:queryFindTreeNode(treeList,'id',1),查找treeList中id为3的节点
**/
export function queryFindTreeNode(treeList, key, value) {
    let result = null;
    if (!treeList) {
        return;
    }
    for (let i = 0; i < treeList.length; i++) {
        if (result !== null) {
            break;
        }
        let item = treeList[i];
        if (item[key] === value) {
            result = item;
            break;
        } else if (item.children && item.children.length > 0) {
            result = queryFindTreeNode(item.children, key, value);
        }
    }
    return result;
}
//下载文件
export function downloadFile(url) {
    if (!url) { throw '缺少必要参数url'; }
    if (navigator.userAgent.indexOf('Trident') > -1) {
        //ie
        window.open(url, '_blank');
    } else {
        //非ie
        const a = document.createElement('a'); // 创建a标签
        const e = document.createEvent('MouseEvents'); // 创建鼠标事件对象
        e.initEvent('click', false, false); // 初始化事件对象
        a.href = url; // 设置下载地址
        a.download = ''; // 设置下载文件名
        a.dispatchEvent(e);
    }
}
/**
 * 日期格式化
 */
export function dateformat(fmt, date) {
    const str = date || new Date();
    let o = {
        'M+': str.getMonth() + 1, //月份
        'd+': str.getDate(), //日
        'h+': str.getHours(), //小时
        'm+': str.getMinutes(), //分
        's+': str.getSeconds(), //秒
        'q+': Math.floor((str.getMonth() + 3) / 3), //季度
        'S': str.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}
// base64 转file,并生成表单数据
export function dataURLtoFile(dataurl, fileName) {
    fileName = fileName || 'avatarfile';
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let fileType = mime.substr(mime.indexOf('/') + 1, mime.length - 1);
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const file = new File([u8arr], fileName + '.' + fileType, { type: mime });
    const formData = new FormData();
    formData.append('file', file);
    return formData;
}