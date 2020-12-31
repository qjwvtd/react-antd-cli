import React, { Fragment, useEffect } from 'react';
import { Card, Rate } from 'antd';
import { useGloblaStroe, useGloblaProvider } from './store/globla';
import GirlApp from './girl';


function GloblaComponentApp() {
    const [state, dispatch] = useGloblaStroe();
    useEffect(() => {
        dispatch({ type: 'init_project', data: { name: '双江口项目', desc: '关于双江口项目的一些描述' } });
        dispatch({ type: 'init_user', data: { name: '龙门砍哥', role: '超级管理员' } });
    }, []);
    return <Fragment>
        <p>{state.project.name}</p>
        <p>{state.project.desc}</p>
        <p>{state.user.name}</p>
        <p>{state.user.role}</p>
    </Fragment>;
}
function GloblaApp() {
    return useGloblaProvider(GloblaComponentApp);
}

function Module4() {
    return <Fragment>
        <Card title="react hook state manage" bordered={false}>
            <Rate disabled value={4.5} className="text-success" />
            <p></p>
            <p>用useContext和useReducer封装的状态管理机,可作全局/局部状态管理器,代替redux,mobx,...,等第三方库</p>
            <GloblaApp />
            <GirlApp />
        </Card>
    </Fragment>;
}
export default Module4;
