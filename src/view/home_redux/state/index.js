import { useState, useEffect } from 'react';
import { createStore } from 'redux';
//导入多个store
import { project, projectReducer, projectActions } from './project';
import { goods, goodReducer, goodsActions } from './good';
//bind store
const stores = { ...{ project, goods } };
//注册reducer,绑定action
const options = [
    { reducer: projectReducer, action: projectActions },
    { reducer: goodReducer, action: goodsActions }
];
//reducer
function reducer(state = stores, action) {
    try {
        const current = options.filter((item) => {
            const active = Object.keys(item.action).filter(
                act => item.action[act] === action.type
            )[0];
            return item.action[active];
        })[0];
        current && current.reducer(state, action);
        if (!current) {
            console.error('no existent of reducer or action');
        }
    } catch (e) {
        console.error(e.name + " :" + e.message);
    }
    return Object.assign({}, state);
}
//store
const store = createStore(reducer);
//dispatch
const dispatch = store.dispatch;
//use hook
export default function useStore() {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);
    return { state, dispatch };
}
