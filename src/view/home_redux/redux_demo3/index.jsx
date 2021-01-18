import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Input, Rate } from 'antd';
import { useStore, Wapper, actions } from './store';
const { initGirl, initProject } = actions;
//Test1
function Test1() {
    const [state, dispatch] = useStore();
    useEffect(() => {
        dispatch(initGirl());
        dispatch(initProject());
    }, []);
    return <p>{state.project.address}</p>;
}
//Test2
function Test2() {
    const [state] = useStore();
    return <Fragment>
        <p>{state.project.address}</p>
    </Fragment>;
}
//Girl
function Girl() {
    const [state] = useStore();
    return <Card title={'girl'}>
        {
            state.girl.list.map((item) => {
                return <Row key={item._id}>
                    <Col span={6}><img src={item.url} style={{ width: '98%' }} /></Col>
                    <Col span={18}><p>{item.author}</p><p>{item.desc}</p></Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
    </Card>;
}
//Project
function Project() {
    const [state, dispatch] = useStore();
    function handleChange(value) {
        dispatch({ type: 'update_project_address', value: value });
    }
    return <Card title={'project'}>
        <p className="text-gray">项目demo有本地接口,请先运行npm run server</p>
        <p>{state.project.name}</p>
        <p>{state.project.address}</p>
        <Input
            value={state.project.address}
            onChange={(e) => handleChange(e.target.value)}
        />
    </Card>;
}
//App
function App() {
    return <Fragment>
        <Row>
            <Col span={24}><Girl /></Col>
            <Col span={24}><Project /></Col>
            <Col span={24}><Test1 /><Test2 /></Col>
        </Row>
    </Fragment>;
}

export default function ReduxDemo3() {
    return <Wapper>
        <Card title="redux,react-redux,redux-thunk" bordered={false}>
            <Rate disabled value={5} className="text-success" />
            <p></p>
            <p>redux,react-redux,redux-thunk</p>
            <p>包大小(摘自npm,未压缩Unpacked Size):</p>
            <p>redux: <b>163.0 KB</b></p>
            <p>react-redux: <b>271.0 KB</b></p>
            <p>redux-thunk: <b>17.7 KB</b></p>
            <App />
        </Card>
    </Wapper>;
}
