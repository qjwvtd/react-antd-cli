import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { GirlProvider, useGirlStore } from './store/girl';

function View() {
    const [state, action] = useGirlStore();
    useEffect(() => {
        action.initGirl({ name: '自定义参数' });
    }, []);
    const girl = state.girl;
    return <>
        <p>
            <b>★girl</b>
            <Button type="link" onClick={() => action.initGirl()}>刷新</Button>
        </p>
        <Row key={girl._id + Date.now()}>
            <Col span={4}><img src={girl.url} style={{ width: '98%' }} /></Col>
            <Col span={20}>
                <b>{girl.author}</b>
                <p>{girl.desc}</p>
            </Col>
            <Col span={24}><p></p></Col>
        </Row>
    </>;
}
export default function GirlApp() {
    return <GirlProvider><View /></GirlProvider>;
}
