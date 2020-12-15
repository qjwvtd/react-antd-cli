import React, { useReducer, useContext } from 'react';
import { stores, reducer } from './stores';
//context
const Context = React.createContext(stores);
//使用Provider
export function CustomProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, stores);
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
