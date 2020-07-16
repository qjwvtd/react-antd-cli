/* eslint-disable indent */
import React from 'react';
import moment from 'moment';
export const dateFormat = 'YYYY/MM/DD';
//初始state
export const store = {
    startTime: moment('2020/07/01', dateFormat), //开始日期
    endTime: moment('2020/07/07', dateFormat), //结束日期
    deptName: null, //选择的部门名称
    name: 'my name will change'//姓名
};
//使用context
export const Context = React.createContext(store);
//reducer
export function reducer(state, action) {
    switch (action.type) {
        case 'updateName':
            store.name = action.name;
            return Object.assign({}, store);
        case 'updateDate':
            store.startTime = action.start;
            store.endTime = action.end;
            return Object.assign({}, store);
        default:
            throw new Error();
    }
}