import React, { } from 'react';
import { Row, Col, Button } from 'antd';
import { useStore } from './store';
export default function Girl() {
    const { state, action } = useStore();
    const girl = state.girl;
    return <>
        <b>★girl</b>
        <Button type="link" onClick={() => action.initGirl()}>刷新</Button>
        <Row key={girl._id + Date.now()}>
            <Col span={3}><img src={girl.url} style={{ width: '98%' }} /></Col>
            <Col span={21}>
                <b>{girl.author}</b>
                <p>{girl.desc}</p>
            </Col>
            <Col span={24}><p></p></Col>
        </Row>
    </>;
}
