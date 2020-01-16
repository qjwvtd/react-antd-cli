// 客户详情
import React, { Component } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import { observer } from 'mobx-react';
import userStore from '@/common/store/userStore';

@observer
export default class UserDetails extends Component{
    // 关闭弹窗
    handleCancel() {
        this.props.hideModal();
    }
    render() {
        let infoData = userStore.data.userFormalInfoData;
        return (
            <Modal
                title="查看客户详情"
                wrapClassName='user_modal user_detail_modal'
                visible={ this.props.visible }
                maskClosable={false}
                centered
                width={1000}
                onCancel={() => this.handleCancel()}
                footer={
                    <Button onClick={() => this.handleCancel()}>返回</Button>
                }>
                <Row type="flex" justify="space-around">
                    <Col span={11} className='group'>
                        <div className='label'>负责人</div>
                        <div className='info'>{infoData.principal}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>状态</div>
                        <div className='info'>
                            <span className={`icon_box ${infoData.status === 0 ? 'green' : 'gray'}`}></span>
                            <span>{infoData.status === 0 ? '启用' : '禁用'}</span>
                        </div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>手机号码</div>
                        <div className='info'>{infoData.phone}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>备用手机号</div>
                        <div className='info'>{infoData.sparePhone}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>公司名称</div>
                        <div className='info'>{infoData.company}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>所在部门</div>
                        <div className='info'>{infoData.department}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>所属角色</div>
                        <div className='info'>{infoData.role}</div>
                    </Col>
                    <Col span={11} className='group'>
                        <div className='label'>创建时间</div>
                        <div className='info'>{infoData.createTime}</div>
                    </Col>
                    <Col span={23} className='group'>
                        <div className='label'>备注</div>
                        <div className='remark'>{infoData.remark}</div>
                    </Col>
                </Row>
            </Modal>
        );
    }
}