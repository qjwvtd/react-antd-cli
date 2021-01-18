import React, { Fragment, useEffect } from 'react';
import { Row, Col, Input, Alert, Button } from 'antd';
import { initGirl } from './store/girl/action';
import { Wapper, useStore } from './store';

function Count() {
    const { state, dispatch } = useStore();
    useEffect(() => {
        dispatch(initGirl());
    }, []);
    return <div>
        <p><b>###项目信息</b></p>
        <Alert message={state.project.name + ',' + state.project.address} type="info" />
        <p><b>###女孩信息</b></p>
        <Alert message={state.girl.list[0] && state.girl.list[0].author + ',' + '图片' + state.girl.list.length + '张'} type="info" />
    </div>;
}
function Project() {
    const { state, dispatch } = useStore();
    function updateProjectAddress(e) {
        const action = {
            type: 'update_project_address',
            value: e.target.value
        };
        dispatch(action);
    }
    return <Fragment>
        <Input
            value={state.project.address}
            onChange={updateProjectAddress}
        />
    </Fragment>;
}
function Girl() {
    const { state, dispatch } = useStore();
    return <Fragment>
        {
            state.girl.list.map((item) => {
                return <Row key={item._id}>
                    <Col span={2}><img src={item.url} style={{ width: '98%' }} /></Col>
                    <Col span={2} className="text-center"><b>{item.author}</b></Col>
                    <Col span={20}>{item.desc}</Col>
                    <Col span={24}><p></p></Col>
                </Row>;
            })
        }
        <Button onClick={() => { dispatch(initGirl()); }}>刷新女孩</Button>
    </Fragment>;
}
export default function Test() {
    return <Wapper>
        <Count />
        <Project />
        <Girl />
    </Wapper>;
}



