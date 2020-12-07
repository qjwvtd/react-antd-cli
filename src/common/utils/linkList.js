
/**
 * 数组转化成链表
 * @param {*} arr,原始数组
 * @return linkList;
 */
export default function arrayToLinkList(arr) {
    if (!arr.length) return null;
    let linkList = { prev: null, data: arr[0], next: null };
    let result = linkList;
    for (let i = 1; i < arr.length; i++) {
        result.next = { prev: arr[i - 1], data: arr[i], next: null };
        result = result.next;
    }
    return linkList;
}
