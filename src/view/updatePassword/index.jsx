// 修改密码
import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Layout, Form, Input, Button, Modal, message } from 'antd';
import Logo from '@/view/component/logo';
import MainFoot from '@/view/component/foot';
import { observer } from 'mobx-react';
import user from '@/common/store/user';
import { updatepwd, getUserInfo } from '@/common/api/user';
import routerHistory from '@/common/router';
const { Header, Content } = Layout;

@observer
class PasswordForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            oldpwd: null,
            newpwd: null,
            confirmpwd: null,
            isOldDis: false,
            isNewDis: false,
            isConfirmDis: false,

            userInfo: {}
        };
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    // 获取当前用户信息
    getCurrentUser(){
        getUserInfo().then((res)=>{
            if(res.code === 200){
                this.setState({
                    userInfo: res.data
                });
            }
        });
    }
    // 验证原密码
    oldPwdValid(rule, value, callback) {
        if (value.length === 0) {
            this.setState({
                isOldDis: false
            });
            return callback('请输入密码');
        }
        this.setState({
            oldpwd: value,
            isOldDis: true
        });
    }
    // 验证新密码
    newPwdValid(rule, value, callback) {
        if (value.length === 0) {
            this.setState({
                isNewDis: false
            });
            return callback('请输入密码');
        }
        if(value.length < 8 || value.length > 16){
            this.setState({
                isNewDis: false
            });
            return callback('密码长度不符合要求，请重新输入');
        }
        this.setState({
            newpwd: value,
            isNewDis: true
        });
    }
    // 验证确认密码
    confirmPwdValid(rule, value, callback) {
        if (value.length === 0) {
            this.setState({
                isConfirmDis: false
            });
            return callback('请输入密码');
        }
        if(value !== this.state.newpwd) {
            this.setState({
                isConfirmDis: false
            });
            return callback('两次新密码输入不一致，请重新输入');
        }
        this.setState({
            confirmpwd: value,
            isConfirmDis: true
        });
    }
    // 提交
    handleSubmit(){
        let info = {
            newPassword: this.state.newpwd,
            oldPassword: this.state.oldpwd
        };
        updatepwd(info).then((res)=>{
            if(res.code === 200){
                message.success('修改成功');
                user.logout();
                Modal.success({
                    content: '修改成功，请重新登录',
                    okText: '重新登录',
                    onOk:()=>{
                        routerHistory.push("/login");
                    }
                });
            }
        });
    }
    render() {
        let isBtnDis = this.state.isOldDis && this.state.isNewDis && this.state.isConfirmDis;//判断按钮是否不可点
        let { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
                    <Form.Item label='当前账户：'>
                        <span>{this.state.userInfo.phone}</span>
                    </Form.Item>
                    <Form.Item label='原密码：'>
                        {getFieldDecorator('oldPwd', {
                            validate: [
                                {
                                    trigger: 'onBlur',
                                    rules: [
                                        { required: true, validator: async (rule, value, callback) => await this.oldPwdValid(rule, value, callback) }
                                    ]
                                }
                            ]
                        })(
                            <Input className='ipt' size='large' placeholder='原密码' />
                        )}
                    </Form.Item>
                    <Form.Item label='新密码：'>
                        {getFieldDecorator('newPwd', {
                            validate: [
                                {
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [
                                        { required: true, validator: async (rule, value, callback) => await this.newPwdValid(rule, value, callback) }
                                    ]
                                }
                            ]
                        })(
                            <Input className='ipt' size='large' placeholder='密码长度8-16位' />
                        )}
                    </Form.Item>
                    <Form.Item label='新密码确认：'>
                        {getFieldDecorator('comfirmPwd', {
                            validate: [
                                {
                                    trigger: ['onBlur', 'onChange'],
                                    rules: [
                                        { required: true, validator: async (rule, value, callback) => await this.confirmPwdValid(rule, value, callback) }
                                    ]
                                }
                            ]
                        })(
                            <Input className='ipt' size='large' />
                        )}
                    </Form.Item>
                    <Form.Item className='pwd_btn_group'>
                        <Button type='primary' disabled={!isBtnDis} onClick={() => this.handleSubmit()}>确认</Button>
                        <Link to='/home'>
                            <Button style={{ marginLeft:'16px' }}>返回</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const PasswordWrapForm = Form.create({ name: 'pwdForm' })(PasswordForm);

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
                        <Row>
                            <Col>
                                <div style={{ paddingTop: '120px', width: '400px', margin: '0 auto' }}>
                                    <PasswordWrapForm />
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
            <MainFoot />
        </Fragment>
    );
}
export default UpdatePassword;