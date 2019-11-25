import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { shakePrevent } from '@/common/utils';
import Logo from '@/view/component/logo';

export default class SetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCode: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
    }
    submitLogin() {
        shakePrevent();
    }
    componentDidMount() {
        this.initCode();
    }
    initCode() {
    }
    render() {
        return (
            <React.Fragment>
                <Row><Logo link={'/'} /></Row>
                <Row>
                    <Col span={16}></Col>
                    <Col span={8} className="login-form-container">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                <h2><b>运营后台</b></h2>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size="large"
                                    prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="text"
                                    placeholder="mobile"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="newPassword"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block size="large" onClick={this.submitLogin}>
                                    <Link to="/">提  交</Link>
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row >
            </React.Fragment >
        );
    }
}