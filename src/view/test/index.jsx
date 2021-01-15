import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { useStore, Wapper } from './store';
function Girl() {
    const { state } = useStore();
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
function Project() {
    const { state, dispatch } = useStore();
    function handleChange(value) {
        dispatch({ type: 'update_project_address', value: value });
    }
    return <Card title={'project'}>
        <p>{state.project.name}</p>
        <p>{state.project.address}</p>
        <Input
            value={state.project.address}
            onChange={(e) => handleChange(e.target.value)}
        // defaultValue={state.project.address}
        // onBlur={(e) => handleChange(e.target.value)}
        />
    </Card>;
}
function StoreView() {
    const { dispatch, actions } = useStore();
    const { initGirl, initProject } = actions;
    useEffect(() => {
        dispatch.async(initGirl());
        dispatch.async(initProject());
    }, []);
    return <Fragment>
        <Row>
            <Col span={11}>
                <Girl />
            </Col>
            <Col span={11} offset={2}>
                <Project />
            </Col>
        </Row>
    </Fragment>;
}

export default function Test() {
    return <Wapper>
        <StoreView />
    </Wapper>;
}



