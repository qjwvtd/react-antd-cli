import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Icon, message } from 'antd';
import { shakePrevent, getUrlParam } from '@/common/utils';
import constants from '@/common/utils/constant.js';

import hostoryRoute from '@/common/router';
import { sendResetSMSVerificationCode, updatePassword } from '@/common/api/login';

import Logo from '@/view/component/logo';
import MainFoot from '@/view/component/foot';

class SetpasswordForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            getMobileCodeBtnText: '获取验证码',
            verifyCode: '',
            password: '',
            isVerfiCode: false,
            isPassword: false
        };
    }
    //获取验证码事件
    getMobileVerfiyCode() {
        shakePrevent(60000);
        //按钮交互
        const btnChangeFunc = () => {
            let count = 60;
            this.interval = setInterval(() => {
                let btnText = '';
                if (count > 0) {
                    count = count - 1;
                    btnText = count + 's后重新获取';
                }
                if (count === 0) {
                    clearInterval(this.interval);
                    btnText = '获取验证码';
                }
                this.setState({
                    getMobileCodeBtnText: btnText
                });
            }, 1000);
        };
        //获取短信
        sendResetSMSVerificationCode({ phone: this.state.mobile }).then((res) => {
            if (res.code === 200) {
                btnChangeFunc();
                message.success('短信已发送,请注意查收,^0^!');
            }
        });
    }
    //检查短信验证码
    validateVerfiyCode(rule, value, callback) {
        const reg = constants.reg.verfiyCode;
        if (!value) {
            callback();
        }
        if (!reg.test(value)) {
            callback('验码不正确');
            return;
        }
        this.setState({
            isVerfiCode: reg.test(value),
            verifyCode: value
        });
        callback();
    }
    //检查密码
    validatePassword(rule, value, callback) {
        const reg = constants.reg.password;
        if (!value) {
            callback();
        }
        if (value.length < 8) {
            callback(' ');
        }
        if (!reg.test(value)) {
            callback('密码格式不正确');
            return;
        }
        this.setState({
            isPassword: reg.test(value),
            password: value
        });
        callback();
    }
    //提交
    handleResetSubmit() {
        shakePrevent(60000);
        const sendData = {
            code: this.state.verifyCode,
            password: this.state.password,
            phone: this.state.mobile
        };
        updatePassword(sendData).then((res) => {
            if (res.code === 200) {
                message.success('密码已修改,^0^!');
                clearInterval(this.interval);
                setTimeout(() => {
                    hostoryRoute.push('/login');
                }, 100);
            }
        });
    }
    submitLogin() {
        shakePrevent();
    }
    componentDidMount() {
        this.setState({
            mobile: getUrlParam('mobile')
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const btnDisabled = this.state.isVerfiCode && this.state.isPassword;
        return (
            <Form className="setPwd-form">
                <Form.Item>
                    <Input
                        size="large"
                        type="text"
                        prefix={<span><Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />+86</span>}
                        disabled={true}
                        value={this.state.mobile}
                    />
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('verfiyCode', {
                        rules: [
                            { required: true, message: '请输入验证码' },
                            { validator: this.validateVerfiyCode.bind(this) }
                        ]
                    })(
                        <Input
                            size="large"
                            maxLength={4}
                            addonAfter={
                                <Button
                                    style={{ border: 'none', background: 'transparent' }}
                                    size="small"
                                    onClick={() => this.getMobileVerfiyCode()}
                                >
                                    {this.state.getMobileCodeBtnText}
                                </Button>}
                            type="text"
                            placeholder="短信验证码"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: '请输入8-12个字符的密码' },
                            { validator: this.validatePassword.bind(this) }
                        ]
                    })(
                        <Input.Password
                            size="large"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="输入新密码，由8-12位字符组成"
                            minLength={8}
                            maxLength={12}
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="large" block disabled={!btnDisabled} onClick={() => this.handleResetSubmit()}>确认重置</Button>
                </Form.Item>
            </Form>
        );
    }
}

const SetPwdFormWrap = Form.create()(SetpasswordForm);

export default class SetPwd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCode: ''
        };
    }

    render() {
        return (
            <div className="login-wrap" >
                <div className="login-container">
                    <div className="text-center">
                        <Logo link="/" type={0} />
                    </div>
                    <div className="login-main">
                        <div className="logo-type-title">
                            <h4><b>重置密码</b></h4>
                        </div>
                        <Row className="set-row">
                            <SetPwdFormWrap />
                            <Link to="/login" className="text-center" style={{ color: '#409eff', display: 'block' }}>登录其它账号</Link>
                        </Row >
                    </div>
                </div>
                <MainFoot />
            </div>
        );
    }
}