import React, { useReducer, useContext } from 'react';
import store from './store';
import reducer from './reducer';
//context
const Context = React.createContext(store);
//使用Provider
export function CustomProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, store);
    return <Context.Provider
        value={{ state: state, dispatch: dispatch }}
    >
        {children}
    </Context.Provider>;
}
//使用store
export function useCustomStore() {
    return useContext(Context);
}
