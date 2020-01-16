// 创建为客户 - 试用用户转正式用户
import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Button, message } from 'antd';
import constant from '@/common/utils/constant.js';
import { observer } from 'mobx-react';
import userStore from '@/common/store/userStore';
import { putCustomer } from '@/common/api/customer';

@observer
class EditUserForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNameDis: true,
            isCompanyDis: true
        };
    }
    componentDidMount() {}
    // 负责人验证
    principalValid(rule, value, callback) {
        let paramsObj = userStore.data.userFormalInfoData;
        if (value.length === 0) {
            this.setState({
                isNameDis: false
            });
            return callback('请填写负责人');
        }
        if (value.length > 20) {
            this.setState({
                isNameDis: false
            });
            return callback('长度不超过20字符');
        }
        paramsObj['principal'] = value;
        this.setState({
            isNameDis: true
        });
        userStore.data.userFormalInfoData = paramsObj;
    }
    // 公司名称验证
    companyValid(rule, value, callback) {
        let paramsObj = userStore.data.userFormalInfoData;
        if (value.length === 0) {
            this.setState({
                isCompanyDis: false
            });
            return callback('请填写公司名称');
        }
        if (value.length > 16) {
            this.setState({
                isCompanyDis: false
            });
            return callback('长度不超过16字符');
        }
        paramsObj['company'] = value;
        this.setState({
            isCompanyDis: true
        });
        userStore.data.userFormalInfoData = paramsObj;
    }
    close(){
        userStore.data.userFormalInfoData = {};
        this.props.form.resetFields();
        this.props.hideModal();
    }
    // 获取文本框数据
    getInputValue(e, type){
        let value = e.target.value;
        let paramsObj = userStore.data.userFormalInfoData;
        paramsObj[type] = value;
        userStore.data.userFormalInfoData = paramsObj;
    }

    // 提交
    handleSubmit(){
        if(userStore.data.userFormalInfoData.sparePhone){
            let reg = constant.reg.mobile;
            if (!(reg.test(userStore.data.userFormalInfoData.sparePhone))) {
                message.error('请输入正确的手机号');
                return false;
            }
        }else{
            userStore.data.userFormalInfoData['sparePhone'] = null;
        }
        putCustomer(userStore.data.userFormalInfoData).then((res)=>{
            if(res.code === 200){
                this.close();
                userStore.initUserFormalList();
            }
        });
    }
    render() {
        let infoData = userStore.data.userFormalInfoData;
        let isBtnDis = this.state.isNameDis && this.state.isCompanyDis;//判断按钮是否不可点
        let { getFieldDecorator } = this.props.form;
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
                <Row>
                    <Col span={12}>
                        <Form.Item label='手机号码'>
                            {infoData.phone}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='创建时间'>
                            {infoData.createTime}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='负责人'>
                            {getFieldDecorator('principal', {
                                initialValue: infoData.principal,
                                validate: [
                                    {
                                        trigger: ['onBlur', 'onChange'],
                                        rules: [
                                            { required: true, validator: async (rule, value, callback) => await this.principalValid(rule, value, callback) }
                                        ]
                                    }
                                ]
                            })(
                                <Input size='large' maxLength={20} placeholder='请填写负责人姓名' />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='公司名称'>
                            {getFieldDecorator('company', {
                                initialValue: infoData.company,
                                validate: [
                                    {
                                        trigger: ['onBlur', 'onChange'],
                                        rules: [
                                            { required: true, validator: async (rule, value, callback) => await this.companyValid(rule, value, callback) }
                                        ]
                                    }
                                ]
                            })(
                                <Input size='large' maxLength={16} placeholder='请填写公司名称' />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='所在部门'>
                            {getFieldDecorator('department', {
                                initialValue: infoData.department
                            })(
                                <Input size='large' maxLength={20} placeholder='所在部门' onChange={(e) => this.getInputValue(e, 'department')} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='所属角色'>
                            {getFieldDecorator('role', {
                                initialValue: infoData.role
                            })(
                                <Input size='large' maxLength={20} placeholder='所属角色' onChange={(e) => this.getInputValue(e, 'role')} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='备用手机号'>
                            {getFieldDecorator('sparePhone', {
                                initialValue: infoData.sparePhone
                            })(
                                <Input size='large' maxLength={11} placeholder='备用手机号' onChange={(e) => this.getInputValue(e, 'sparePhone')} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='备注'>
                            {getFieldDecorator('remark', {
                                initialValue: infoData.remark
                            })(
                                <Input.TextArea rows={4} maxLength={500} placeholder='备注' onChange={(e) => this.getInputValue(e, 'remark')} />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{ textAlign:'center' }}>
                        <Button type='primary' disabled={!isBtnDis} onClick={() => this.handleSubmit()}>保存</Button>
                        <Button style={{ marginLeft:'16px' }} onClick={() => this.close()}>返回</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const EditUserWrapForm = Form.create({ name: 'myForm' })(EditUserForm);

export default class EditUser extends Component{
    handleCancel() {
        this.props.hideModal();
    }
    render() {
        return (
            <Modal
                title="修改客户详情"
                wrapClassName='edit_user_modal'
                visible={ this.props.visible }
                maskClosable={false}
                centered
                width={1000}
                onCancel={() => this.handleCancel()}
                footer={[]}>
                <EditUserWrapForm hideModal={() => this.handleCancel()}/>
            </Modal>
        );
    }
}