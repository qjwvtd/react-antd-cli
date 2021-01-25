import React, { useEffect } from 'react';
import { Card, Rate, Input, Row, Col, Button } from 'antd';
import { GloblaProvider, useGloblaStore } from './store/index.js';
import GirlApp from './girl';

function User() {
    const [state, action] = useGloblaStore();
    useEffect(() => {
        action.initUser();
    }, []);
    return <>
        <b>★user</b>
        <p>{state.user.data.name + ', ' + state.user.data.role}</p>
    </>;
}
function Project() {
    const [state, action] = useGloblaStore();
    const { initProject, updateProjectAddres } = action;
    useEffect(() => {
        initProject('自定义参数');
    }, []);
    const info = state.project.info;
    return <div>
        <b>★project</b>
        <p>{info.name + ', ' + info.address},<Button type="link" onClick={() => action.initProject()}>刷新</Button></p>
        <Row>
            <Col span={20}>
                <Input value={info.address} onChange={(e) => updateProjectAddres(e.target.value)} />
            </Col>
        </Row>
    </div>;
}
export default function Demo3() {
    return <GloblaProvider>
        <Card title="直接使用xxxAction()" bordered={false}>
            <Rate disabled value={5} className="text-success" />
            <p>
                顶层组件使用useState管理所有state,将set方法传到action,在各个子组件直接调用这些方法,
                摒弃了绕人的reducer和dispatch,比纯用useReducer和useContext封装的更优雅
            </p>
            <p>使用到的React api,[createContext,useContext,useState]</p>
            <User />
            <Project />
            <GirlApp />
        </Card>
    </GloblaProvider>;
}
