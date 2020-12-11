'use strict';
import React from 'react';
import globalHook from 'use-global-hook';
//user state
const userInfo = {};
//user action
const userActions = {
    //初始化<异步请求>
    initUser: (store) => {
        setTimeout(() => {
            const data = { id: 1, name: 'zhangXiaoJun', address: '成都双流' };
            store.setState(data);
        }, 1000);
    },
    //更新名称
    updateUserName: (store, name) => {
        const state = store.state;
        state.name = name;
        store.setState(state);
    },
    //更新地址
    updateUserAddress: (store, address) => {
        const state = store.state;
        state.address = address;
        store.setState(state);
    }
};
//user hook
const globalUser = globalHook(React, userInfo, userActions);
//export user store
export default globalUser;
