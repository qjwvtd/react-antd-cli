import React, { useEffect } from 'react';
import { Card, Rate, Input, Row, Col, Button } from 'antd';
import { GloblaProvider, useGloblaStore } from './store/index.js';
// import GirlApp from './girl';

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
        initProject();
    }, []);
    function handleChange(value) {
        updateProjectAddres(value);
    }
    const project = state.project;
    return <div>
        <b>★project</b>
        <p>{project.name + ', ' + project.address},<Button type="link" onClick={() => action.initProject()}>刷新</Button></p>
        <Row>
            <Col span={20}>
                <Input value={project.address} onChange={(e) => handleChange(e.target.value)} />
            </Col>
        </Row>
    </div>;
}
export default function Test() {
    useEffect(() => {
        const num = -123456;
        const str = num.toString();
        let temp = '';
        if (str.length === 0) { temp = str; }
        for (let i = str.length - 1; i > -1; i--) {
            temp += str[i];
        }
        console.log(Number(temp));
    }, []);
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
            {/* <GirlApp /> */}
        </Card>
    </GloblaProvider>;
}
