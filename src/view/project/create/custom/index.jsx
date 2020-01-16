import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button, Input, Modal, Icon, Pagination, Table, Radio } from 'antd';
import { getCustomerList } from '@/common/api/public';
import createStore from '@/common/store/project/createStore';

function CustomDetail({ visible, setVisible, data }) {
    function handleOk() {
        setVisible(false);
    }
    return <Fragment>
        <Modal
            title="客户详情"
            visible={visible}
            onCancel={() => handleOk()}
            footer={
                <div className="text-center">
                    <Button type="primary" onClick={() => handleOk()}>确定</Button>
                </div>
            }
        >
            <section className="custom-detail-section">
                <span>负责人</span>
                <p>{data.principal}</p>
                <span>状态</span>
                <p>{data.status === 0 ? '已启用' : '已禁用'}</p>
                <span>手机号码</span>
                <p>{data.phone}</p>
                <span>备用手机号码</span>
                <p>{data.sparePhone}</p>
                <span>公司名称</span>
                <p>{data.company}</p>
                <span>所在部门</span>
                <p>{data.department}</p>
                <span>所属角色</span>
                <p>{data.role}</p>
                <span>创建时间</span>
                <p>{data.createTime}</p>
                <span>备注</span>
                <p>{data.remark}</p>
            </section>
        </Modal>
    </Fragment>;
}

const CustomList = observer(({ visible, setVisible }) => {
    const [detailVisible, setDetailVisible] = useState(false);
    const [detailData, setDetailData] = useState({});
    const [checkedName, setCheckedName] = useState(null);
    const [companyName, setCompanyName] = useState('');
    const [duty, setDuty] = useState('');
    const [phone, setPhone] = useState('');
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(1);
    const [list, setList] = useState([]);//客户list
    //radio选择某一条
    function handleCustomNameRadio(item) {
        setCheckedName(item.company);
        createStore.setCustomer(item);
    }
    //查看详情
    function lookDetail(item) {
        setDetailVisible(true);
        setDetailData(item);
    }
    const columns = [
        {
            title: '公司名称', dataIndex: 'company',
            render: (text, record) => {
                return <span>
                    <Radio checked={checkedName === record.company} onClick={() => handleCustomNameRadio(record)}>{record.company}</Radio>
                </span>;
            }
        },
        { title: '负责人', dataIndex: 'principal' },
        { title: '手机号码', dataIndex: 'phone' },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => {
                return <span>
                    <Button type="link" onClick={() => lookDetail(record)}>查看</Button>
                </span>;
            }
        }
    ];
    function init() {
        const sendData = {
            company: companyName,
            principal: duty,
            phone: phone,
            status: 0, //只查启用的
            page: page,
            size: size
        };
        getCustomerList(sendData).then((res) => {
            // console.log(res);
            if (res.code === 200) {
                setList(res.data.list);
                setTotal(res.data.totalCount);
            }
        });
    }
    function onHandlePaginationChange(_page, _size) {
        setPage(_page); setSize(_size);
        init();
    }
    //重置
    function reSet() {
        setCompanyName('');
        setDuty('');
        setPhone('');
        setPage(1);
        setSize(10);
    }
    useEffect(() => {
        init();
    }, [companyName, duty, phone]);
    return <Fragment>
        <Modal
            title="选择项目所属客户"
            width={"1080px"}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={
                <div className="text-center">
                    <Button type="primary" disabled={!createStore.base.customer} onClick={() => setVisible(false)}>确定</Button>
                </div>
            }
        >
            <Row className="ui-search-row">
                <Col span={6}>
                    <span>公司名称:</span>
                    <Input type="text" placeholder="公司名称" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </Col>
                <Col span={6}>
                    <span>负责人:</span>
                    <Input type="text" placeholder="负责人" value={duty} onChange={(e) => setDuty(e.target.value)} />
                </Col>
                <Col span={5}>
                    <span>手机号:</span>
                    <Input type="text" placeholder="手机号" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Col>
                <Col span={5} offset={1} className="ui-btns-rows text-right">
                    <Button type="primary" onClick={() => init()}><Icon type="search" />查询</Button>
                    <Button onClick={() => reSet()}><Icon type="undo" />重置</Button>
                </Col>
            </Row>
            <Row className="ui-table-row" style={{ marginBottom: '16px', height: '360px', overflow: 'hidden', overflowY: 'auto' }}>
                <Table columns={columns} dataSource={list} pagination={false} rowKey="id" />
            </Row>
            <div className="text-right">
                <Pagination
                    showSizeChanger
                    defaultPageSize={size}
                    defaultCurrent={page}
                    onShowSizeChange={(p, s) => onHandlePaginationChange(p, s)}
                    onChange={(p, s) => onHandlePaginationChange(p, s)}
                    total={total}
                />
            </div>
            <CustomDetail visible={detailVisible} setVisible={setDetailVisible} data={detailData} />
        </Modal>
    </Fragment >;
});

export default CustomList;