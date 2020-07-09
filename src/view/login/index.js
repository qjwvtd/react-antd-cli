/*手机号登录*/
import React, { Component, Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Route } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col, Layout } from 'antd';
import { getImgCode64 } from '@/common/api/login';
import { setToken } from '@/common/utils';
import constants from '@/common/utils/constant.js';
import Logo from '@/view/component/logo';
import MainFoot from '@/view/component/foot';
import { LOGINSECRET } from '@/common/api/login';
import user from '@/common/store/user';

const { Header, Content } = Layout;

@observer
class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCode: '',
            mobile: '',
            password: '',
            verifyCode: '',
            isMobile: false, //手机检查是否通过
            isPassword: false, //密码检查是否通过
            isVerfiCode: false, //验证码检查是否通过
            isTipsVisible: false //无项目或无权限提示弹窗
        };
    }
    //检查手机
    validateMobile(rule, value, callback) {
        const reg = constants.reg.mobile;
        if (value.length === 0) {
            this.setState({
                isMobile: false
            });
            return;
        }
        if (!reg.test(value)) {
            return callback('请输入正确的手机号');
        }
        this.setState({
            isMobile: reg.test(value),
            mobile: value
        });
        return callback();
    }
    //检查密码
    validatePassword(rule, value, callback) {
        if (!value) {
            this.setState({
                isPassword: false
            });
            return callback();
        }
        this.setState({
            isPassword: true,
            password: value
        });
        callback();
    }
    //检查图形验证码
    validateVerfiyCode(rule, value, callback) {
        const reg = constants.reg.verfiyCode;
        if (value.lenthg < 4) {
            this.setState({
                isVerfiCode: false
            });
            return;
        }
        if (value.lenthg === 4 && !reg.test(value)) {
            callback('验码输入有误');
            return;
        }
        this.setState({
            isVerfiCode: reg.test(value),
            verifyCode: value
        });
        callback();
    }
    //登录按钮
    loginButton() {
        const btnDisabled = this.state.isMobile && this.state.isPassword && this.state.isVerfiCode;
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
    //提交登录
    // submitLogin() { }
    initCode() {
        const sendData = {
            "height": 40,
            "key": LOGINSECRET.key,
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        getImgCode64(sendData).then((res) => {
            if (res && res.code === 200) {
                this.setState({
                    imgCode: 'data:image/jpeg;base64,' + res.data
                });
            }
        });
    }
    tipsCallback() {
        this.props.form.resetFields();
        this.setState({
            isTipsVisible: false,
            isMobile: false, //手机检查是否通过
            isPassword: false, //密码检查是否通过
            isVerfiCode: false //验证码检查是否通过
        });
    }
    componentDidMount() {
        this.initCode();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator('mobile', {
                        validate: [
                            {
                                trigger: 'onBlur',
                                rules: [
                                    { required: true, message: '请输入手机号码' },
                                    { validator: async (a, b, c) => await this.validateMobile(a, b, c) }
                                ]
                            }
                        ]
                    })(
                        <Input
                            size="large"
                            placeholder="手机号"
                            maxLength={11}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        validate: [
                            {
                                trigger: ['onBlur', 'onChange'],
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { validator: async (a, b, c) => await this.validatePassword(a, b, c) }
                                ]
                            }
                        ]
                    })(
                        <Input.Password
                            size="large"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('imgCode', {
                        rules: [
                            { required: true, message: '请输入4个字符的图形验证码' },
                            { validator: async (a, b, c) => await this.validateVerfiyCode(a, b, c) }
                        ]
                    })(
                        <Input
                            size="large"
                            addonAfter={<img src={this.state.imgCode} title="验证码" onClick={this.initCode.bind(this)} style={{ display: 'inline-block', width: '100px', height: '32px' }} />}
                            placeholder="验证码"
                            maxLength={4}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {this.loginButton()}
                </Form.Item>
            </Form>
        );
    }
}
const Login = observer(() => {
    const LoginWrapForm = Form.create()(LoginForm);
    useEffect(() => {
        user.logout();
    }, []);
    return (
        <Fragment>
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
                            <Col>
                                <div style={{ paddingTop: '120px', width: '360px', margin: '0 auto' }}>
                                    <LoginWrapForm />
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
            <MainFoot />
        </Fragment>
    );
});
export default Login;