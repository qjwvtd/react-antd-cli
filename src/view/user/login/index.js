import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import Logo from '@/view/components/logo';
import { getImgCode64 } from '@/common/api/login';
import { getUUid, shakePrevent } from '@/common/utils';

//router
import routerHistory from '@/common/router';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgCode: ''
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log('login');
        routerHistory.push('/');
    }
    submitLogin() {
        shakePrevent();
    }
    componentDidMount() {
        this.initCode();
    }
    initCode() {
        const sendData = {
            "height": 40,
            "key": getUUid(),
            "lineSize": 0,
            "stringNum": 4,
            "width": 100
        };
        getImgCode64(sendData).then((res) => {
            console.log(res);
            this.setState({
                imgCode: 'data:image/jpeg;base64,' + res.data
            }, () => {
                console.log(this.state.imgCode);
            });
        });
    }
    render() {
        return (
            <React.Fragment>
                <Row><Logo link={null} /></Row>
                <Row>
                    <Col span={16}></Col>
                    <Col span={8} className="login-form-container">
                        <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                            <Form.Item>
                                <h2><b>运营后台</b></h2>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size="large"
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    size="large"
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row>
                                    <Col span={16}>
                                        <Input size="large" prefix={<Icon type="barcode" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="图形验证码" />
                                    </Col>
                                    <Col span={8}>
                                        <img src={this.state.imgCode} alt="图形验证码" onClick={this.initCode.bind(this)} />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block size="large" htmlType="submit">登  录</Button>
                            </Form.Item>
                            <Form.Item>
                                <Link to="/setPassword">忘记密码?</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row >
            </React.Fragment >
        );
    }
}