import { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
//import reducer
import project from './project';
import good from './good';
//merge reducer
const reducer = combineReducers({
    project, good
});
//store
const store = createStore(reducer, {});
//use hook
export default function useStore() {
    const [state, updateState] = useState(store.getState());
    //dispatch
    const dispatch = store.dispatch;
    let subscribe = null;
    useEffect(() => {
        subscribe = store.subscribe(() => {
            updateState(store.getState());
        });
        //cancel subscribe
        return () => subscribe();
    }, []);
    return { state, dispatch };
}
