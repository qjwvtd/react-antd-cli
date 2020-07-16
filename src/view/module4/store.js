/* eslint-disable indent */
import React from 'react';
//初始化的state
export const store = { name: 'my name will change' };
//使用context
export const Context = React.createContext(store);
//reducer
export function reducer(state, action) {
    switch (action.type) {
        case 'updateName':
            return { name: action.name };
        default:
            throw new Error();
    }
}