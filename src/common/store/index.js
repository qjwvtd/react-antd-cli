import { inject } from 'mobx-react';
import userStore from './user';
import personStore from './person';
export default { userStore, personStore };
/**
 * inject使用多个store
 * inject,inject('store1')(inject('store2')(inject('store3')()))
 */
export function injectAll(arr) {
    if (!arr || arr.length === 0) { throw '错误的参数个数,useInject接受至少一个长度的数组'; }
    let injectobj = inject(arr[0]);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && i > 0) {
            injectobj = injectobj(inject(arr[i + 1]));
        }
    }
    return injectobj;
}
