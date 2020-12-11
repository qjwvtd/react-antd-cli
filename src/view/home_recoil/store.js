'use strict';
import { atom, selector } from 'recoil';
const userState = atom({
    // unique ID (with respect to other atoms/selectors)
    key: 'userState',
    // default value (aka initial state)(aka:又名)
    default: {
        name: '龙门砍哥',
        role: '管理员',
        address: '成都双流',
        description: 'recoil有两个重要且常用的API(atom,selector),atom用于申明变量即state ,selector通常用于计算值 ,相当于mobx的complated功能,这个值可以直接渲染到组件里'
    }
});
export const showState = atom({
    key: 'showState',
    default: true
});
export const filterShowState = selector({
    key: 'filterNumState',
    get: ({ get }) => {
        const show = get(showState);
        switch (show) {
            case true:
                return '不显示';
            case false:
                return '显示';
        }
    }
});
export default userState;
