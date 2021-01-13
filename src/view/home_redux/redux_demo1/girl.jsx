import React, { Fragment, useEffect } from 'react';
import { Row, Col } from 'antd';
import { initGirl } from './action';
import { useGirlStore } from './store/girl';

export default function GilrInfo() {
    const [state, dispatch] = useGirlStore();
    useEffect(() => {
        dispatch.async(initGirl());
    }, []);
    return <Fragment>
        <p style={{ paddingTop: '24px' }}><b>✦,女孩儿信息</b>: </p>
        {
            state.girl.list.map((item) => {
                return <Row key={item._id}>
                    <Col span={4}><img src={item.url} style={{ width: '100%' }} /></Col>
                    <Col span={19} offset={1}>
                        <p>{item.author}</p>
                        <p>{item.desc}</p>
                    </Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
    </Fragment>;
}
