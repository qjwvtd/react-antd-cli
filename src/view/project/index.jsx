import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Select, Button, Icon, Table, Pagination, Switch, message } from 'antd';
import router from '@/common/router';

import project from '@/common/store/project';
import { switchProjectStatus } from '@/common/api/project';

const { Option } = Select;

//查询,重置,创建
const ProjectTop = observer(() => {
    //查询
    function query() {
        project.init();
    }
    //重置
    function reSet() {
        project.setProjectName(null);
        project.setCustomerName(null);
        project.setProjectStatus(null);
        project.init();
    }
    return <Fragment>
        <Col span={4}>
            <span>项目名称:</span>
            <Input type="text" placeholder="项目名称" value={project.name} onChange={(e) => project.setProjectName(e.target.value)} />
        </Col>
        <Col span={5} offset={1}>
            <span>所属客户:</span>
            <Input type="text" placeholder="客户名称" value={project.customer} onChange={(e) => project.setCustomerName(e.target.value)} />
        </Col>
        <Col span={3} offset={1}>
            <span>状态:</span>
            <Select value={project.status} style={{ width: 80 }} onChange={(val) => project.setProjectStatus(val)}>
                <Option value={null}>全部</Option>
                <Option value={0}>启用</Option>
                <Option value={1}>禁用</Option>
            </Select>
        </Col>
        <Col span={10} className="ui-btns-rows text-right">
            <Button type="primary" onClick={() => query()}><Icon type="search" />查询</Button>
            <Button onClick={() => reSet()}><Icon type="undo" />重置</Button>
            <Button type="primary" onClick={() => router.push('/home/project_create')}><Icon type="plus-circle" />创建项目</Button>
        </Col>
    </Fragment>;
});

//项目列表
const ProjectTable = observer(() => {
    //查看项目
    function lookProject(record) {
        router.push('/home/project_look/' + record.id);
    }
    //编辑项目
    function editPorject(record) {
        router.push('/home/project_edit/' + record.id);
    }
    //启用或禁用项目
    function playProject(record) {
        const reState = record.status === 0 ? 1 : 0;
        const tips = record.status === 0 ? '已禁用' : '已启用';
        const sendData = { id: record.id, status: reState };
        switchProjectStatus(sendData).then((res) => {
            if (res.code === 200) {
                project.init();
                message.success('项目<' + record.name + '>' + tips);
            }
        });
    }
    const columns = [
        { title: '项目名称', dataIndex: 'name' },
        { title: '作业面数量', dataIndex: 'workSurfaceCount' },
        { title: '设备数量', dataIndex: 'deviceCount' },
        { title: '所属客户', dataIndex: 'customerName' },
        { title: '创建时间', dataIndex: 'createTime' },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                const flag = record.status === 0;
                return <Switch checked={flag} size={'small'} onClick={() => playProject(record)} />;
            }
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => {
                const flag = record.status === 0;
                const _text_ = flag ? '禁用' : '启用';
                return <span>
                    <Button type="link" onClick={() => lookProject(record)}>查看</Button>
                    <Button type="link" onClick={() => editPorject(record)} disabled={!flag}>修改</Button>
                    <Button type="link" checked={flag} onClick={() => playProject(record)}>{_text_}</Button>
                </span>;
            }
        }
    ];
    useEffect(() => {
        project.init();
    }, [project.name, project.customer, project.status]);
    return <Table columns={columns} dataSource={project.list} pagination={false} rowKey="id" />;
});
const Projects = observer(() => {
    function paginationInit(page, size) {
        project.setProjectPagination(page, size);
        project.init();
    }
    function onShowSizeHandleChange(current, pageSize) {
        paginationInit(current, pageSize);
    }
    function onHandleChange(page, size) {
        paginationInit(page, size);
    }
    return (
        <Fragment>
            <div className="ui-content-container">
                <Row className="ui-search-row searchprojectrow">
                    <ProjectTop />
                </Row>
                <Row className="ui-table-row" style={{ height: 'calc(100% - 120px)' }}>
                    <ProjectTable />
                </Row>
                <div className="ui-pagination-layout">
                    <Pagination
                        showSizeChanger
                        defaultPageSize={project.size}
                        defaultCurrent={project.page}
                        onShowSizeChange={(p, s) => onShowSizeHandleChange(p, s)}
                        onChange={(p, s) => onHandleChange(p, s)}
                        total={project.total}
                    />
                    <span>共{project.total}条</span>
                </div>
            </div>
        </Fragment>
    );
});
export default Projects;