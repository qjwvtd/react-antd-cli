import React, { useReducer, useContext } from 'react';
//store
import stores from './stores';
//reducer
import reducers from './reduders';
//context
const Context = React.createContext(stores);
//使用Provider
export function UseRootProvider({ children }) {
    const [state, dispatch] = useReducer(reducers, stores);
    return <Context.Provider
        value={{ state: state, dispatch: dispatch }}
    >
        {children}
    </Context.Provider>;
}
//使用store
export function useRootStore() {
    return useContext(Context);
}
