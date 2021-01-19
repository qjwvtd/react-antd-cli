import React, { Fragment, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useStore } from './store';

function GirlAppComponent() {
    const { state, action } = useStore();
    useEffect(() => {
        action.initGirl({ name: '自定义参数' });
    }, []);
    return <Fragment>
        {
            state.girl.list.map((item) => {
                return <Row key={item._id + Date.now()}>
                    <Col span={4}><img src={item.url} style={{ width: '100%' }} /></Col>
                    <Col span={19} offset={1}><p>{item.author}</p><p>{item.desc}</p></Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
    </Fragment>;
}
function GirlApp() {
    const { action } = useStore();
    return <Fragment>
        <p>
            <b>异步获取数据</b>
            <Button
                type='link'
                onClick={() => { action.initGirl(); }}
            >
                刷新
            </Button>
        </p>
        <GirlAppComponent />
    </Fragment>;
}
export default GirlApp;
