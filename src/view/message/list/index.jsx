import React, { Fragment } from 'react';
import { Row, Col, Icon, Button, DatePicker, Pagination, Table } from 'antd';
const { RangePicker } = DatePicker;

//查询,重置,创建
const MessageTop = () => {
    function onChange(date, dateString) {
        console.log(date, dateString);
    }
    //查询
    function query() { }
    //重置
    function reSet() { }
    return <Fragment>
        <Col span={14}>
            <span>接收时间:</span>
            <RangePicker onChange={onChange} />
        </Col>
        <Col span={10} className="ui-btns-rows text-right">
            <Button type="primary" onClick={() => query()}><Icon type="search" />查询</Button>
            <Button onClick={() => reSet()}><Icon type="undo" />重置</Button>
        </Col>
    </Fragment>;
};
//项目列表
const MessageListTable = () => {
    const columns = [
        { title: '发送人', dataIndex: 'sendName' },
        { title: '主题', dataIndex: 'theme' },
        { title: '接收时间', dataIndex: 'getTime' },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                const flag = record.status === 0;
                return <span>{flag ? '已读' : '未读'}</span>;
            }
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => {
                console.log(record);
                return <span>
                    <Button type="link">查看</Button>
                </span>;
            }
        }
    ];
    const mockData = [
        { sendName: '龙门白哥', theme: '年关了,注意防火', getTime: '2019/11/22 16:30', status: 0 },
        { sendName: '龙门砍哥', theme: '新年快乐', getTime: '2021/02/25 11:30', status: 1 }
    ];
    return <Table columns={columns} dataSource={mockData} pagination={false} rowKey="sendName" />;
};
const MessageList = () => {
    function onHandlePagination(page, size) {
        console.log(page, size);
    }
    return (
        <Fragment>
            <div className="ui-content-container">
                <Row className="ui-search-row">
                    <MessageTop />
                </Row>
                <Row className="ui-table-row" style={{ height: 'calc(100% - 120px)' }}>
                    <MessageListTable />
                </Row>
                <div className="ui-pagination-layout">
                    <Pagination
                        showSizeChanger
                        defaultPageSize={10}
                        defaultCurrent={1}
                        onShowSizeChange={(p, s) => onHandlePagination(p, s)}
                        onChange={(p, s) => onHandlePagination(p, s)}
                        total={1}
                    />
                    <span>共{1}条</span>
                </div>
            </div>
        </Fragment>
    );
};
export default MessageList;