// 正式用户
import React, { Component } from 'react';
import { Form, Input, Button, Table, Pagination, Select, Modal, message, Icon } from 'antd';
import { observer } from 'mobx-react';
import userStore from '@/common/store/userStore';
import UserDetails from './userDetails';
import EditUser from './editUser';
import { getProjectNumberCount } from '@/common/api/project';
import { putCustomerStatus } from '@/common/api/customer';

@observer
export default class UserFormal extends Component{
    constructor(props){
        super(props);
        this.state = {
            filters: {
                company: '',
                principal: '',
                phone: '',
                status: ''
            }, //筛选

            pageNo: 1,
            pageSize: 10,

            statusList: [
                {
                    text: '全部',
                    value: ''
                }, {
                    text: '启用',
                    value: 0
                }, {
                    text: '禁用',
                    value: 1
                }
            ],
            isGoDetails: false, //查看详情,
            isGoEditDetails: false, //编辑详情,

            userId: null//当前用户id
        };
    }
    componentDidMount() {
        this.searchQuery();
    }
    // 查询
    searchQuery() {
        let { company, principal, phone, status } = this.state.filters;
        let { pageNo, pageSize } = this.state;
        userStore.initUserFormalList(company, principal, phone, status, pageNo, pageSize);
    }
    // 获取筛选value
    getValue(e, type){
        let value = e.target.value;
        let filter = this.state.filters;
        filter[type] = value;
        this.setState({
            filters: filter
        });
    }
    // 获取筛选状态
    getStatus(value){
        let filter = this.state.filters;
        filter['status'] = value;
        this.setState({
            filters: filter
        });
    }
    // 分页设置
    setPage(page, size){
        this.setState({
            pageNo: page,
            pageSize: size
        }, () => {
            this.searchQuery();
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
    // 查询
    searchData(){
        this.setState({
            pageNo: 1,
            pageSize: 10
        }, ()=>{
            this.searchQuery();
        });
    }
    // 重置
    resetData(){
        this.setState({
            pageNo: 1,
            pageSize: 10,
            filters: {
                company: '',
                principal: '',
                phone: '',
                status: ''
            }
        }, ()=>{
            this.searchQuery();
        });
    }
    // 查看详情
    lookModal(id) {
        this.setState({
            isGoDetails: true
        }, ()=>{
            userStore.initUserFormalinfo(id);
        });
    }
    // 编辑
    editModal(id) {
        this.setState({
            isGoEditDetails: true
        }, ()=>{
            userStore.initUserFormalinfo(id);
        });
    }
    // 关闭弹窗
    hideModal(type){
        if(type === 'info') {
            this.setState({
                isGoDetails: false
            });
        }else if(type === 'edit') {
            this.setState({
                isGoEditDetails: false
            });
        }
    }
    // 启用 / 禁用
    openOrClose(record, type) {
        let that = this;
        if(type === 'open') {
            Modal.confirm({
                content: '确认要启用 '+ record.company +' 吗？',
                onOk:() => {
                    let params = {
                        id: record.id,
                        status: 0
                    };
                    that.changeCustomerStatus(params, '启用');
                }
            });
        }else {
            getProjectNumberCount({customerId: record.id}).then((res)=>{
                if(res.code === 200){
                    if(res.data === 0){
                        Modal.confirm({
                            content: '确认要禁用 '+ record.company +' 吗？禁用后该客户账号将不能使用',
                            onOk:() => {
                                let params = {
                                    id: record.id,
                                    status: 1
                                };
                                that.changeCustomerStatus(params, '禁用');
                            }
                        });
                    }else {
                        Modal.warning({
                            content: record.company + ' 存在关联的项目，请取消关联后再禁用客户'
                        });
                    }
                }
            });
        }
    }
    // 禁用启用接口
    changeCustomerStatus(params, type) {
        let that = this;
        putCustomerStatus(params).then((res) => {
            if(res.code === 200){
                message.success(type + '成功');
                that.searchQuery();
            }
        });
    }
    render() {
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'company'
            },
            {
                title: '负责人',
                dataIndex: 'principal'
            },
            {
                title: '手机号码',
                dataIndex: 'phone'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (text, record) => (
                    <span>
                        <div className='status_box'>
                            <span className={`icon_box ${record.status === 0 ? 'green' : 'gray'}`}></span>
                            <span>{record.status === 0 ? '启用' : '禁用'}</span>
                        </div>
                    </span>
                )
            },
            {
                title: '操作',
                align:'center',
                render: (text, record) => (
                    <span>
                        <Button type="link" onClick={() => this.lookModal(record.id)}>查看</Button>
                        <Button type="link" onClick={() => this.editModal(record.id)}>修改</Button>
                        { record.status === 1 &&
                            <Button type="link" onClick={() => this.openOrClose(record, 'open')}>启用</Button>
                        }
                        { record.status === 0 &&
                            <Button type="link" onClick={() => this.openOrClose(record, 'close')}>禁用</Button>
                        }
                    </span>
                )
            }
        ];
        return (
            <div className='user_formal_container'>
                <div className="user_formal_search">
                    <Form layout="inline">
                        <Form.Item>
                            <span>公司名称：</span>
                            <Input
                                value={this.state.filters.company}
                                placeholder='搜索公司名称'
                                style={{ width: 200 }}
                                onChange={(e) => this.getValue(e, 'company')} />
                        </Form.Item>
                        <Form.Item>
                            <span>负责人：</span>
                            <Input
                                value={this.state.filters.principal}
                                placeholder='搜索负责人'
                                style={{ width: 200 }}
                                onChange={(e) => this.getValue(e, 'principal')} />
                        </Form.Item>
                        <Form.Item>
                            <span>手机号码：</span>
                            <Input
                                value={this.state.filters.phone}
                                placeholder='搜索手机号码'
                                style={{ width: 200 }}
                                onChange={(e) => this.getValue(e, 'phone')} />
                        </Form.Item>
                        <Form.Item>
                            <span>状态：</span>
                            <Select className='mr24'
                                value={this.state.filters.status}
                                style={{ width: 200 }}
                                onChange={(value) => this.getStatus(value)}>
                                {
                                    this.state.statusList.map((item) => {
                                        return <Select.Option value={item.value} key={item.text}>{item.text}</Select.Option>;
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button className='btn' type='primary'
                                onClick={() => this.searchData()}><Icon type="search" />查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button className='btn'
                                onClick={() => this.resetData()}><Icon type="undo" />重置</Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='user_formal_table'>
                    <Table dataSource={userStore.data.userFormalData}
                        columns={columns}
                        pagination={false}
                        rowKey={row => row.id} />
                </div>
                <div className='ui-pagination-layout'>
                    <Pagination current={this.state.pageNo}
                        pageSize={this.state.pageSize}
                        showSizeChanger
                        total={userStore.data.userFormalTotalCount}
                        onChange={this.onPageChange}
                        onShowSizeChange={this.onShowSizeChange} />
                    <span>共 {userStore.data.userFormalTotalCount} 条</span>
                </div>

                {/* 用户详情 */}
                <UserDetails visible={this.state.isGoDetails} hideModal={() => this.hideModal('info')} />
                {/* 编辑用户详情 */}
                <EditUser visible={this.state.isGoEditDetails} hideModal={() => this.hideModal('edit')} />
            </div>
        );
    }
}