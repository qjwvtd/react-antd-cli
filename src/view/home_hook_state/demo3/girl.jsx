import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { GirlWapper, useGirlStore } from './store/girl';

function View() {
    const [state, action] = useGirlStore();
    useEffect(() => {
        action.initGirl({ name: '自定义参数' });
    }, []);
    const list = state.girl.list;
    return <>
        <b>★girl</b>
        <p>{list.length}个女孩,<Button type="link" onClick={() => action.initGirl()}>刷新</Button></p>
        {
            list.map((item) => {
                return <Row key={item._id + Date.now()}>
                    <Col span={2}><img src={item.url} style={{ width: '98%' }} /></Col>
                    <Col span={22}>
                        <b>{item.author}</b>
                        <p>{item.desc}</p>
                    </Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
    </>;
}
export default function GirlApp() {
    return <GirlWapper><View /></GirlWapper>;
}
