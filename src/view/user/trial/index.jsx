import React, { Component } from 'react';
import { Input, Button, Table, Pagination, Icon, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import userStore from '@/common/store/userStore';
import CreateFormalUser from './createFormalUser';

@observer
export default class UserTrial extends Component{
    constructor(props){
        super(props);
        this.state = {
            keyword: '', //手机号

            pageNo: 1,
            pageSize: 10,

            isCreate: false //创建为客户
        };
    }

    componentDidMount() {
        let { keyword, pageNo, pageSize } = this.state;
        userStore.initUserTrialList(keyword, pageNo, pageSize);
    }
    // 获取keyword
    getKeyword(e) {
        let value = e.currentTarget.value;
        this.setState({
            keyword: value
        });
    }
    // 分页设置
    setPage(page, size){
        this.setState({
            pageNo: page,
            pageSize: size
        }, () => {
            let { keyword, pageNo, pageSize } = this.state;
            userStore.initUserTrialList(keyword, pageNo, pageSize);
        });
    }
    // 分页查询
    onPageChange = (page, pageSize) => {
        this.setPage(page, pageSize);
    }
    // 改变每页显示条数
    onShowSizeChange = (current, pageSize) => {
        this.setPage(current, pageSize);
    }
    // 重置
    resetData(){
        this.setState({
            pageNo: 1,
            pageSize: 10,
            keyword: ''
        }, ()=>{
            let { keyword, pageNo, pageSize } = this.state;
            userStore.initUserTrialList(keyword, pageNo, pageSize);
        });
    }
    // 创建为正式用户
    showModal(id, userId, phone){
        this.setState({
            isCreate: true
        });
        userStore.data.probationId = id;
        userStore.data.userTrialUserId = userId;
        userStore.data.userTrialPhone = phone;
    }
    // 关闭弹窗
    hideModal(){
        this.setState({
            isCreate: false
        });
    }
    render() {
        const columns = [
            {
                title: '手机号码',
                dataIndex: 'phone'
            },
            {
                title: '最新试用时间',
                dataIndex: 'newTrialTime'
            },
            {
                title: '试用次数',
                dataIndex: 'trialNumber'
            },
            {
                title: '操作',
                align:'center',
                render: (text, record) => (
                    <Button type="link" onClick={() => this.showModal(record.id, record.userId, record.phone)}>创建为客户</Button>
                )
            }
        ];
        return (
            <div className='user_trial_container'>
                <div className="user_trial_search">
                    <Row type="flex" justify="start">
                        <Col>
                            <span>手机号码：</span>
                            <Input placeholder='搜索手机号码'
                                value={this.state.keyword}
                                style={{ width: 200 }}
                                onChange={(e) => this.getKeyword(e)} />
                        </Col>
                        <Col>
                            <Button type='primary' className="btn"
                                onClick={() => userStore.initUserTrialList(this.state.keyword, 1, 20)}>
                                <Icon type="search" />查询
                            </Button>
                            <Button className="btn" onClick={() => this.resetData()}><Icon type="undo" />重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className='user_trial_table'>
                    <Table dataSource={userStore.data.userTrialData}
                        columns={columns}
                        pagination={false}
                        rowKey={row => row.id} />
                </div>
                <div className='ui-pagination-layout'>
                    <Pagination current={this.state.pageNo}
                        pageSize={this.state.pageSize}
                        showSizeChanger
                        total={userStore.data.userTrialTotalCount}
                        onChange={this.onPageChange}
                        onShowSizeChange={this.onShowSizeChange} />
                    <span>共 {userStore.data.userTrialTotalCount} 条</span>
                </div>
                {/* 创建为客户 */}
                <CreateFormalUser visible={this.state.isCreate} hideModal={() => this.hideModal()} />
            </div>
        );
    }
}