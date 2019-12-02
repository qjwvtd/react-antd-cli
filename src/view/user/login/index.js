/*手机号登录*/
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { getImgCode64 } from '@/common/api/login';
import { shakePrevent, setToken } from '@/common/utils';
import constants from '@/common/utils/constant.js';
import { setCurrentProjectId } from '@/common/store/storage';

import Logo from '@/view/component/logo';

import MainFoot from '@/view/component/foot';

import { loginWithMobilePassword, LOGINSECRET } from '@/common/api/login';
import { getLastTimeProject } from '@/common/api/public';

//router
import routerHistory from '@/common/router';

class LoginForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imgCode: '',
            mobile: '',
            password: '',
            verifyCode: '',
            isMobile: false, //手机检查是否通过
            isPassword: false, //密码检查是否通过
            isVerfiCode: false //验证码检查是否通过
        };
    }
    //检查手机
    validateMobile(rule, value, callback) {
        const reg = constants.reg.mobile;
        if (value.length < 11) {
            return;
        }
        if (value.length === 11 && !reg.test(value)) {
            return callback('手机号码格式不正确');
        }
        this.setState({
            isMobile: reg.test(value),
            mobile: value
        });
        return callback();
    }
    //检查密码
    validatePassword(rule, value, callback) {
        const reg = constants.reg.password;
        if (value.length < 8) {
            return;
        }
        if (value.length === 8 && !reg.test(value)) {
            callback('密码格式不正确');
            return;
        }
        this.setState({
            isPassword: reg.test(value),
            password: value
        });
        callback();
    }
    //检查图形验证码
    validateVerfiyCode(rule, value, callback) {
        const reg = constants.reg.verfiyCode;
        if (value.lenthg < 4) {
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
    //提交登录
    submitLogin() {
        shakePrevent();
        const sendData = {
            clientId: LOGINSECRET.id,
            clientSecret: LOGINSECRET.secret,
            key: LOGINSECRET.key,
            password: this.state.password,
            phone: this.state.mobile,
            verifyCode: this.state.verifyCode
        };
        //调用登录接口
        loginWithMobilePassword(sendData).then((res) => {
            // console.log(res);
            if (res.code === 200) {
                setToken(res.data.token);
                setTimeout(() => {
                    //获取最近使用的项目
                    getLastTimeProject(null).then((response) => {
                        if (response.code === 200) {
                            setCurrentProjectId(response.data);
                            routerHistory.push("/home");
                        }
                    });
                }, 100);
            }
        });
    }
    componentDidMount() {
        this.initCode();
    }
    initCode() {
        const sendData = {
            "height": 40,
            "key": LOGINSECRET.key,
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        getImgCode64(sendData).then((res) => {
            // console.log(res);
            if (res && res.code === 200) {
                this.setState({
                    imgCode: 'data:image/jpeg;base64,' + res.data
                });
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const btnDisabled = this.state.isMobile && this.state.isPassword && this.state.isVerfiCode;
        return (
            <Form className="login-form">
                <Form.Item>
                    {getFieldDecorator('mobile', {
                        rules: [
                            { required: true, message: '请输入手机号码' },
                            { validator: async(a, b, c) => await this.validateMobile(a, b, c) }
                        ]
                    })(
                        <Input
                            size="large"
                            prefix={<span><Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />+86</span>}
                            placeholder="手机号"
                            maxLength={11}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入8-12个字符的密码' },
                            { validator: async(a, b, c) => await this.validatePassword(a, b, c) }
                        ]
                    })(
                        <Input.Password
                            size="large"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                            minLength={8}
                            maxLength={12}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('imgCode', {
                        rules: [
                            { required: true, message: '请输入4个字符的图形验证码' },
                            { validator: async(a, b, c) => await this.validateVerfiyCode(a, b, c) }
                        ]
                    })(
                        <Input
                            size="large"
                            addonAfter={<img src={this.state.imgCode} alt="图形验证码" onClick={this.initCode.bind(this)} />}
                            placeholder="验证码"
                            maxLength={4}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" block size="large" htmlType="submit" disabled={!btnDisabled} onClick={() => this.submitLogin()}>登  录</Button>
                </Form.Item>
            </Form>
        );
    }
}

const LoginWrapForm = Form.create()(LoginForm);

function Login(props) {
    const { } = props;
    return (
        <div className="login-wrap">
            <div className="login-container">
                <div className="text-center">
                    <Logo link="/" type={0} />
                </div>
                <div className="login-main">
                    <div className="logo-type-title">
                        <h4><b>手机号登录</b></h4>
                    </div>
                    <LoginWrapForm />
                    <Row>
                        <Col span={12} className="forgetPwd">
                            <Link to="/setPwdCheckMobile">忘记密码?</Link>
                        </Col>
                        <Col span={12} className="login-type-qrcode text-right">
                            <Link to="/qrcodeLogin"><Icon type="qrcode" />二维码登录</Link>
                        </Col>
                    </Row>
                </div>
            </div>
            <MainFoot />
        </div>
    );
}
export default Login;