import React, { Fragment, useEffect } from 'react';
import { Row, Col, Input, Skeleton, Card, Rate } from 'antd';
import globalUser from './store';

//展示组件
function ShowInfo() {
    const [userInfo] = globalUser();
    return <div>
        {
            userInfo.id ?
                <Fragment>
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
    return <Row>
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
    return <Row>
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
        <Card title="use-global-hook" bordered={false}>
            <Rate disabled allowHalf value={2.5} className="text-success" />
            <p></p>
            <p className="text-red">注:数据从顶层组件注入,有rerender的性能问题</p>
            <p>使用use-global-hook包管理react状态,仅用一个API实现状态管理,包大小(摘自npm,未压缩Unpacked Size):</p>
            <p>use-global-hook: <b>25.1 kB</b></p>
            <ShowInfo />
            <UpdateName />
            <br />
            <UpdateAddress />
        </Card>
    </Fragment>;
};
export default Module3;
