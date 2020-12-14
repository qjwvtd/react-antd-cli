import React, { useReducer } from 'react';
import { user, userReducer } from './user';
import { project, projectReducer } from './project';
//注册store
const stores = { project, user };
//注册reducer
function reducer(state, action) {
    userReducer(state, action);
    projectReducer(state, action);
    return Object.assign({}, state);
}
//使用context
export const Context = React.createContext({ ...stores });
//使用Provider
export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { ...stores });
    return <Context.Provider
        value={{ state: state, dispatch: dispatch }}
    >
        {children}
    </Context.Provider>;
};
