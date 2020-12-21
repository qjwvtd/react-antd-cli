import React, { Fragment, useEffect } from 'react';

const user = {
    name: 'zhangxiaojun',
    list: ['a', 'b', 'c'],
    option: { address: 'chengdu', sex: 1 }
};

const initState = { text: "react.js", color: "red" };
function reducerDemo(state = initState, action) {
    console.log(state);
    switch (action.type) {
        case 'UPDATE_TITLE_TEXT':
            state.text = action.text;
            break;
        case 'UPDATE_TITLE_COLOR':
            state.color = action.color;
            break;
    }
    return Object.assign({}, state);
}

function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action); //重新赋值
        listeners.forEach((listener) => listener());
    };
    dispatch({}); //初始化state
    return { getState, dispatch, subscribe };
}

function useStore() {
    const store = createStore(reducerDemo);
    store.subscribe(() => {
        store.getState();
    });
    return [store.getState(), store.dispatch];
}

export default function Test() {
    const [state, dispatch] = useStore();
    useEffect(() => {
        dispatch({ type: "UPDATE_TITLE_TEXT", text: "这是修改后的数据" });
        dispatch({ type: "UPDATE_TITLE_COLOR", color: "orange" });
    }, []);
    return <Fragment>
        <p>{user.name}</p>
        <div style={{ color: state.color }}>{state.text}</div>
    </Fragment>;
}



