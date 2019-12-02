import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Row, Icon } from 'antd';
import { shakePrevent } from '@/common/utils';
import constants from '@/common/utils/constant.js';

import MainFoot from '@/view/component/foot';
import Logo from '@/view/component/logo';

class SetPwdForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            isMobile: false
        };
    }
    validateMobile(rule, value, callback) {
        const reg = constants.reg.mobile;
        if (value.length < 11) {
            return;
        }
        if (value.length === 11 && !reg.test(value)) {
            callback('手机号码格式不正确');
        }
        this.setState({
            isMobile: reg.test(value),
            mobile: value
        });
        callback();
    }
    submitLogin() {
        shakePrevent();
    }
    componentDidMount() { }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="setPwd-form">
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
                    <Button type="primary" block disabled={!this.state.isMobile}><Link to={"/setPwd?mobile=" + this.state.mobile}>重置密码</Link></Button>
                </Form.Item>
            </Form >
        );
    }
}

const SetPwdFormWarp = Form.create()(SetPwdForm);

export default class SetPwdCheckMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                            <p>请先输入要找回密码的手机号，如无法通过手机找回请发送邮件至 support@dhza.com 寻求帮助</p>
                            <SetPwdFormWarp />
                        </Row >
                    </div>
                </div>
                <MainFoot />
            </div>
        );
    }
}