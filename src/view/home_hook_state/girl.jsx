import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useStore } from './store';
import { initGirl } from './store/action';

function GirlAppComponent() {
    const { state, dispatch } = useStore();
    useEffect(() => {
        dispatch.async(initGirl());
    }, []);
    return <Fragment>
        {
            state.girl.list.map((item) => {
                return <Row key={item._id}>
                    <Col span={4}><img src={item.url} style={{ width: '100%' }} /></Col>
                    <Col span={19} offset={1}><p>{item.author}</p><p>{item.desc}</p></Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
    </Fragment>;
}
function GirlApp() {
    return <Fragment>
        <p><b>异步获取数据</b></p>
        <GirlAppComponent />
    </Fragment>;
}
export default GirlApp;
