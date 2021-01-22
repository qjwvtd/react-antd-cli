'use strict';
import React from 'react';

//combineActionMap
function combineActionMap(actionMap) {
    const stores = {}, actions = {};
    for (let key in actionMap) {
        if (typeof actionMap[key] !== 'object') {
            throw 'The action must be an object type';
        }
        if (stores.hasOwnProperty(key)) {
            throw 'The same store already exists.';
        }
        stores[key] = {};
        const actionAnys = actionMap[key];
        const keys = Object.keys(actionAnys);
        keys.forEach((item) => {
            if (actions.hasOwnProperty(key)) {
                throw 'The same action already exists.';
            }
            if (typeof actionAnys[item] === 'function') {
                actions[item] = actionAnys[item];
            }
            if (typeof actionAnys[item] !== 'function') {
                stores[key][item] = actionAnys[item];
            }
        });
    }
    return { stores, actions };
}

export default function createLiveStore(actionMap) {
    if (arguments.length === 0) {
        throw 'Reducer and action is required';
    }
    if (arguments[0].constructor !== Object) {
        throw 'Parameter exception,The action collection must be an object type, ' +
        'For example: {action1,action2,...} or {action}';
    }
    //绑定到参数上
    actionMap = arguments[0];
    //stores,actions
    const { stores, actions } = combineActionMap(actionMap);
    //Context
    const Context = React.createContext(stores);
    //Wapper
    function Wapper({ children }) {
        const [state, dispatchAction] = React.useState(stores);
        //new setState
        const setState = function (newState) {
            const calculatedState = Object.assign({}, newState);
            return dispatchAction(calculatedState);
        };
        //combinehookAction
        function combineHookAction() {
            const combineAction = {};
            for (let key in actions) {
                combineAction[key] = function (params) {
                    const nextParams = [setState, state, params];
                    return actions[key].apply(actions[key], nextParams);
                };
            }
            return combineAction;
        }
        const action = combineHookAction();
        return <Context.Provider value={{ state, action }}>
            {children}
        </Context.Provider>;
    }
    function useStore() {
        const { state, action } = React.useContext(Context);
        return [state, action];
    }
    return { Wapper, useStore };
}
