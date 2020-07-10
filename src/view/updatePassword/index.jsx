// 修改密码
import React, { Fragment } from 'react';
import { Row, Col, Layout } from 'antd';
import Logo from '@/view/component/logo';
import MainFoot from '@/view/component/foot';
const { Header, Content } = Layout;

function UpdatePassword() {
    return (
        <Fragment>
            <Layout>
                <Header>
                    <Row>
                        <Col span={8}>
                            <Logo link="/login" type={1} />
                        </Col>
                    </Row>
                </Header>
                <Layout>
                    <Content>
                        修改密码组件
                    </Content>
                </Layout>
            </Layout>
            <MainFoot />
        </Fragment>
    );
}
export default UpdatePassword;