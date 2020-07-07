import React from 'react';
import { createStore } from 'redux';
import Counter from './components/Counter.js';
import counter from './reducers';

const store = createStore(counter);

const Render = () => {
    return <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />;
};
const ReduxExample = store.subscribe(Render);
export default ReduxExample;