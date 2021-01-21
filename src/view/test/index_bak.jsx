import React, { Fragment } from 'react';
import { Button } from 'antd';

const store = {
    color: 'red',
    text: 'Hello world'
};

const Context = React.createContext(store);

const actions = {
    switchColor: function ({ setState, state, params }) {
        console.log(state);
        state.color = params;
        console.log(state);
        const newState = Object.assign({}, state);
        setState(newState);
    }
};

function Other() {
    console.log('test is rerender');
    return <>Other</>;
}
function Show() {
    const { state, action } = React.useContext(Context);
    const { switchColor } = action;
    return <>
        <b style={{ fontSize: '20px', padding: '12px', color: state.color }}>{state.text}</b>
        <Button type="link" onClick={() => switchColor('red')}>Red Theme</Button>
        <Button type="link" onClick={() => switchColor('green')}>Green Theme</Button>
    </>;
}
function ThemeProvider({ children }) {
    const [state, setState] = React.useState(store);
    function combineHookAction(actionMap) {
        const action = {};
        for (let key in actionMap) {
            if (action.hasOwnProperty[key]) {
                throw 'The same action already exists,The error occurred in:' + actionMap[key].name;
            }
            if (typeof actionMap[key] === 'function') {
                action[key] = function (params) {
                    return actionMap[key].call(actionMap[key], { setState, state, params });
                };
            }
        }
        return action;
    }
    const action = combineHookAction(actions);
    return (
        <Context.Provider value={{ state, action }}>{children}</Context.Provider>
    );
}


export default function TestBak() {
    return <>
        <ThemeProvider>
            <Show />
        </ThemeProvider>
        <Other />
    </>;
}
