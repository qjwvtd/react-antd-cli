import React, { Component } from 'react';
import { Modal, Form, Button, Input, message } from 'antd';
import constant from '@/common/utils/constant.js';
import { loginWithMobileNote, LOGINSECRET, sendSMSVerificationCode } from '@/common/api/login';
import { getLastTimeProject } from '@/common/api/public';
import { createProbationData } from '@/common/api/user';
import hashHistory from '@/common/router';//路由跳转
import {setToken} from '@/common/utils/index.js';//存token
import ProgressPage from '../progressPage';


// 表单组件
class MyForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            codeState: 0, // 0初始状态，1倒计时，2重新获取
            count: 60, //60s倒计时
            phone: '',
            code: '',
            isPhoneDis: false,
            isCodeDis: false
        };
    }

    componentDidMount() {
        this.props.onRef(this);
    }
    // 验证码内容
    codeHtml() {
        if (this.state.codeState === 0) {
            return (
                <Button className = 'getCode_box' onClick = {() => this.getCode()}>获取验证码</Button>
            );
        } else if(this.state.codeState === 1) {
            return (
                <Button className = 'getCode_box code_active' disabled>{this.state.count}s后重新获取</Button>
            );
        } else {
            return (
                <Button className = 'getCode_box' onClick = {() => this.getCode()}>重新获取</Button>
            );
        }
    }
    // 获取验证码倒计时
    getCode() {
        if(!this.state.isPhoneDis){
            message.error('请输入正确的手机号');
            return;
        }
        let params = {
            phone: this.state.phone
        };
        // 发送短信验证码
        sendSMSVerificationCode(params).then((res)=>{
            if(res.code === 200){
                message.success('短信已发送,请注意查收,^0^!');
                this.setTime();
            }else{
                message.error(res.msg);
            }
        });
    }
    // 短信倒计时
    setTime(){
        let {count} = this.state;
        this.timer = setInterval(() => {
            if(count === 0){
                clearInterval(this.timer);
                this.setState({
                    codeState: 2,
                    count: 60
                });
            }else{
                count--;
                this.setState({
                    count: count,
                    codeState: 1
                });
            }
        }, 1000);
    }
    // 验证手机号
    phoneValid(rule, value, callback){
        let reg = constant.reg.mobile;
        if(value.length === 0){
            this.setState({
                isPhoneDis: false
            });
            callback('请输入手机号');
        }
        if(!(reg.test(value))){
            callback('请输入正确的手机号');
        }
        this.setState({
            phone: value,
            isPhoneDis: reg.test(value)
        });

    }
    // 验证码验证
    codeValid(rule, value, callback) {
        if(value.length === 0){
            this.setState({
                isCodeDis: false
            });
            callback('请输入验证码');
            return;
        }
        this.setState({
            code: value,
            isCodeDis: true
        });

    }
    // 试用登录提交
    handleSubmit(){
        if(this.state.isPhoneDis && this.state.isCodeDis){
            let params = {
                clientId: LOGINSECRET.id,
                clientSecret: LOGINSECRET.secret,
                code: this.state.code,
                phone: this.state.phone
            };
            loginWithMobileNote(params).then((res)=>{
                if(res.code === 200){
                    let token = res.data.token;
                    setToken(token);//存token
                    this.getLastEnterProject();
                }
            });
        }
    }
    // 获取上一次进入项目
    getLastEnterProject(){
        getLastTimeProject({official:0}).then((res)=>{
            if(res.code === 200){
                let lastProject = res.data;
                if(lastProject){
                    // 存在，直接进入
                    hashHistory.push('/home');
                    this.props.hideModal(false);
                }else{
                    // 不存在，加载试用数据
                    this.props.showProgressEvent(true);
                    this.getTryOutData();
                }
            }
        });
    }
    // 获取试用数据
    getTryOutData(){
        createProbationData().then((res)=>{
            if(res.code === 200){
                this.props.showProgressEvent(false);
                this.props.hideModal(false);
                hashHistory.push('/home');
            }
        });
    }
    // 重置数据表单
    resetDataOrForm(){
        clearInterval(this.timer);
        this.setState({
            codeState: 0,
            count: 60,
            phone:'',
            code: '',
            isPhoneDis:false,
            isCodeDis: false
        });
        this.props.form.resetFields();
    }
    render() {
        let isBtnDis = this.state.isCodeDis && this.state.isPhoneDis;//判断按钮是否不可点
        let { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item className='phone_item'>
                    {getFieldDecorator('phone', {
                        rules: [
                            { required: true, validator: async(rule, value, callback) => await this.phoneValid(rule, value, callback) }
                        ]
                    })(
                        <Input className='ipt' size = 'large' placeholder='手机号' maxLength={11}
                            prefix={<span className='phoneTips'>+86</span>}/>
                    )}
                </Form.Item>
                <Form.Item className='code_item'>
                    {getFieldDecorator('code', {
                        rules: [
                            { required: true, validator: async(rule, value, callback)=> await this.codeValid(rule, value, callback) }
                        ]
                    })(
                        <Input className='ipt' size = 'large' placeholder = '短信验证码' addonAfter = {this.codeHtml()}/>
                    )}
                </Form.Item>
                <Form.Item style = {{textAlign: 'center'}}>
                    <Button type='primary' disabled={!isBtnDis}  onClick={()=>this.handleSubmit()}>开始试用</Button>
                </Form.Item>
            </Form>
        );
    }
}
const TryoutWrappe = Form.create({name:'myName'})(MyForm);


// modal组件
class TryoutModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false
        };
    }
    // 关闭弹窗 清空数据 清空表单
    hideModal(value) {
        this.props.hideModal(value);
        // 调用表单组件清空数据
        this.onRef.resetDataOrForm();
    }
    showProgress(value){
        this.setState({
            showProgress: value
        });
    }
    render() {
        return (
            <Modal title = '免费试用'
                width={600}
                zIndex={10}
                wrapClassName = {'tryout_modal'}
                maskClosable={false}
                visible = {this.props.visible}
                centered = {true}
                onCancel = {() => this.hideModal()}
                footer = {
                    []
                }>
                <p className = 'tips' > 为方便试用后与您进行产品方案沟通， 请使用手机号进行登录使用 </p>
                <div className='form_box'>
                    <TryoutWrappe
                        onRef={ref => this.onRef = ref}
                        hideModal={(value)=>this.hideModal(value)}
                        showProgressEvent={(value)=>this.showProgress(value)}/>
                </div>
                {/* 进度条加载 */}
                {this.state.showProgress && <ProgressPage />}
            </Modal>
        );
    }
}
export default TryoutModal;