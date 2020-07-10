/*手机号登录*/
import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Layout } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { getImgCode64 } from '@/common/api/login';
import { setToken } from '@/common/utils';
import Logo from '@/view/component/logo';
import MainFoot from '@/view/component/foot';
import { LOGINSECRET } from '@/common/api/login';

const { Header, Content } = Layout;


const LoginForm = observer(() => {
    const [imgCode, setImgCode] = useState(null);
    const [mobile, setMobile] = useState(null);
    const [password, setPassword] = useState(null);
    const [verifyCode, setVerifyCode] = useState(null);
    function initCode() {
        const sendData = {
            "height": 40,
            "key": LOGINSECRET.key,
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        getImgCode64(sendData).then((res) => {
            if (res && res.code === 200) {
                setImgCode('data:image/jpeg;base64,' + res.data);
            }
        });
    }
    //登录按钮
    function LoginButton() {
        const btnDisabled = mobile && password && verifyCode;
        return <Route render={({ history }) => (
            <Button
                type="primary"
                block
                size="large"
                disabled={!btnDisabled}
                onClick={() => {
                    setToken('086b294d-37b5-405a-9650-155ce683a81e');
                    history.push("/home/member");
                }}
            >
                登  录
            </Button>
        )} />;
    }
    useEffect(() => {
        initCode();
    }, []);
    return <Form className="login-form">
        <Form.Item>
            <Input
                size="large"
                placeholder="手机号"
                maxLength={11}
                value={mobile}
                onChange={(e) => { setMobile(e.target.value); }}
            />
        </Form.Item>
        <Form.Item>
            <Input.Password
                size="large"
                prefix={<LockOutlined />}
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
            />
        </Form.Item>
        <Form.Item>
            <Input
                size="large"
                addonAfter={<img src={imgCode} title="验证码" onClick={() => initCode()} style={{ display: 'inline-block', width: '100px', height: '32px' }} />}
                placeholder="验证码"
                maxLength={4}
                value={verifyCode}
                onChange={(e) => { setVerifyCode(e.target.value); }}
            />
        </Form.Item>
        <Form.Item>
            <LoginButton />
        </Form.Item>
    </Form>;
});
const Login = observer(() => {
    return <Fragment>
        <Layout>
            <Header>
                <Row>
                    <Col span={8}>
                        <Logo type={1} />
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Content>
                    <Row>
                        <div style={{ paddingTop: '120px', width: '360px', margin: '0 auto' }}>
                            <LoginForm />
                        </div>
                    </Row>
                </Content>
            </Layout>
        </Layout>
        <MainFoot />
    </Fragment>;
});
export default Login;