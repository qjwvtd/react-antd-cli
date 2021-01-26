'use strict';
import React from 'react';
//combineActionMap
function combineActionMap(actionMap) {
    const stores = {}, actions = {};
    for (let key in actionMap) {
        if (actionMap[key].constructor !== Object) {
            throw 'The action must be an object type';
        }
        if (stores.hasOwnProperty(key)) {
            throw 'a same store name already exists.';
        }
        stores[key] = {};
        const actionAnys = actionMap[key];
        for (let i in actionAnys) {
            const item = actionAnys[i];
            if (actions.hasOwnProperty(i)) {
                throw 'The same action already exists.';
            }
            if (typeof item === 'function') {
                actions[i] = item;
            }
            if (typeof item !== 'function') {
                stores[key][i] = item;
            }
        }
    }
    return { stores, actions };
}

export default function createHookState(actionMap) {
    if (arguments.length === 0) {
        throw 'actionMap is required';
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
    //useWapper
    function useWapper() {
        return function Provider({ children }) {
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
        };
    }
    //useStore
    function useStore() {
        return function useHookStore() {
            console.log(React.useContext(Context));
            return React.useContext(Context);
        };
    }
    return [useStore, useWapper];
}

