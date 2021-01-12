import React, { Fragment, useEffect } from 'react';
import { Card, Rate, Input } from 'antd';
import { useStore, Wapper } from './store';
import GirlApp from './girl';

function View() {
    const { state, dispatch } = useStore();
    useEffect(() => {
        dispatch({ type: 'init_project', data: { name: '双江口项目', desc: '关于双江口项目的一些描述' } });
        dispatch({ type: 'init_user', data: { name: '龙门砍哥', role: '超级管理员' } });
    }, []);
    function handleChange(e) {
        dispatch({ type: 'update_project_desc', value: e.target.value });
    }
    return <Fragment>
        <p>{state.project.name}</p>
        <p>{state.project.desc}</p>
        <p>{state.user.name}</p>
        <p>{state.user.role}</p>
        <Input
            value={state.project.desc}
            onChange={handleChange}
        />
        <p></p>
        <GirlApp />
    </Fragment>;
}
function App() {
    return <Wapper><View /></Wapper>;
}

function Module4() {
    return <Fragment>
        <Card title="react hook state manage" bordered={false}>
            <Rate disabled value={4.5} className="text-success" />
            <p></p>
            <p>用useContext和useReducer封装的状态管理机,全局状态管理器,代替redux,mobx,...,等第三方库</p>
            <App />
        </Card>
    </Fragment>;
}
export default Module4;
