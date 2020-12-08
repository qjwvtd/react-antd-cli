import React, { Fragment, useEffect } from 'react';
import { Row, Col, Input, Skeleton } from 'antd';
import globalUser from './store';

//展示组件
function ShowInfo() {
    const [userInfo] = globalUser();
    return <div style={{ width: '80%', margin: '0 auto', textAlign: 'left' }}>
        {
            userInfo.id ?
                <Fragment>
                    <p>id: {userInfo.id}</p>
                    <p>name: {userInfo.name}</p>
                    <p>address: {userInfo.address}</p>
                </Fragment> :
                <Skeleton />
        }
    </div>;
}
//修改名称组件
function UpdateName() {
    const [userInfo, userAction] = globalUser();
    return <Row style={{ width: '80%', margin: '0 auto' }}>
        <Col span={8}>
            <Input
                value={userInfo.name}
                onChange={(e) => userAction.updateUserName(e.target.value)}
            />
        </Col>
    </Row>;
}
//修改地址组件
function UpdateAddress() {
    const [userInfo, userAction] = globalUser();
    return <Row style={{ width: '80%', margin: '0 auto' }}>
        <Col span={8}>
            <Input
                value={userInfo.address}
                onChange={(e) => userAction.updateUserAddress(e.target.value)}
            />
        </Col>
    </Row>;
}
//容器组件
const Module3 = () => {
    const [userInfo, userAction] = globalUser();
    useEffect(() => {
        if (!userInfo.id) {
            userAction.initUser();
        }
    }, []);
    return <Fragment>
        <h4>使用use-global-hook包来管理react状态</h4>
        <h4>可代替mobx/redux</h4>
        <ShowInfo />
        <UpdateName />
        <br />
        <UpdateAddress />
    </Fragment>;
};
export default Module3;
