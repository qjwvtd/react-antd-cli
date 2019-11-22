import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox, Select, InputGroup, Row, Col } from 'antd';
import Logo from '@/view/components/logo';
import { shakePrevent } from '@/common/utils';

const { Option } = Select;

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            agree: false, //是否同意协议
            verfiyBtnText: '获取验证码'
        };
    }
    //手机区号
    mobileRegionNum() {
        const selectBefore = (
            <Select defaultValue="+86" style={{ width: 75 }}>
                <Option value="+86">+86</Option>
            </Select>
        );
        return selectBefore;
    }
    //是否同意轮廓
    setIsAgree(e) {
        console.log('checked = ', e.target.checked);
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.setState({
            agree: e.target.checked,
            verfiyBtnText: '获取验证码'
        });

    }
    //获取短信验证码
    getVerfiyCode(e) {
        shakePrevent(60000);
        let count = 60;
        this.interval = setInterval(() => {
            if (count > 0) {
                count = count - 1;
                this.setState({
                    verfiyBtnText: count + 's后重新获取'
                });
            }
            if (count === 0) {
                count = 60;
                this.setState({
                    verfiyBtnText: '获取验证码'
                });
                clearInterval(this.interval);
            }
        }, 1000);
    }
    render() {
        return (
            <React.Fragment>
                <Row><Logo link={'/'} /></Row>
                <Row>
                    <Col span={12}>
                        UI图
                    </Col>
                    <Col span={12}>
                        <h3>30秒,快速创建你的智安汇项目</h3>
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <Form.Item>
                                <Input addonBefore={this.mobileRegionNum()} />
                            </Form.Item>
                            <Form.Item>
                                <p>
                                    <Checkbox defaultChecked={this.state.agree} onChange={(e) => this.setIsAgree(e)} />
                                    点击获取验证码代表您已阅读并同意<Button type="link">《用户协议》</Button>
                                </p>
                            </Form.Item>
                            <Form.Item>
                                {
                                    this.state.agree ?
                                        <Button type="primary" onClick={(e) => this.getVerfiyCode(e)}>{this.state.verfiyBtnText}</Button> :
                                        <Button type="primary" disabled>获取验证码</Button>
                                }
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}