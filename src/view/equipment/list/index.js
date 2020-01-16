// 设备管理
import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Select, Button, Icon, Table, Pagination } from 'antd';
import device from '@/common/store/device';
import EquipmentDetail from './equipmentDetail.js';
const { Option } = Select;


//列表
const EquipmentTable = observer(() => {
    const [visible, setVisible] = useState(false);
    // 查询设备详情
    function showDetail(deviceId) {
        device.initDeviceAllinfo(deviceId);
        setVisible(true);
    }
    const columns = [
        {
            title: '设备ID',
            dataIndex: 'deviceId'
        },
        {
            title: '设备类型',
            dataIndex: 'typeName'
        },
        {
            title: '出售状态',
            dataIndex: 'alloted',
            render: (text, record) => {
                const flag = record.alloted === 1;
                const _color = flag ? 'green' : 'orange';
                const _text = flag ? '已出售' : '待出售';
                return <span style={{ color: _color }}>{_text}</span>;
            }
        },
        {
            title: '操作',
            render: (text, record) => {
                return <Button type="link" onClick={() => showDetail(record.deviceId)}>查看</Button>;
            }
        }
    ];
    return <Fragment>
        <Table columns={columns}
            dataSource={device.data.deviceAllLists}
            pagination={false}
            rowKey="deviceId" />
        <EquipmentDetail visible={visible} setVisible={setVisible} />
    </Fragment>;
});


const Equipment = observer(() => {
    const [typeId, setTypeId] = useState(''); //设备类型id
    const [alloted, setAlloted] = useState(''); // 设备出售状态
    const [deviceId, setDeviceId] = useState(''); //设备id

    // 分页处理
    function setPage(page, pageSize) {
        device.setPageSize(page,  pageSize);
        device.initDeviceAllList(typeId, alloted, deviceId);
    }
    //查询
    function searchQuery() {
        device.setPageSize(1,  10);
        device.initDeviceAllList(typeId, alloted, deviceId);
    }

    // 重置
    function resetData() {
        setTypeId('');
        setAlloted('');
        setDeviceId(null);
        device.setPageSize(1,  10);
        device.initDeviceAllList('', '', null);
    }
    // 页面销毁
    function destroy() {
        device.data.deviceAllLists = [];
        device.data.deviceAllTotalCount = 0;
    }
    useEffect(() => {
        // 获取设备类型
        device.initDeviceTypeList();
        // 获取设备统计数量
        device.initDeviceStatistics();
        return destroy;
    }, []);

    return (
        <div className="ui-content-container">
            <div className="ui-total-row">
                <Row type="flex" justify="start" className='total_box'>
                    <Col>
                            当前设备库存总数为：<span className='total_num'>{device.data.deviceSum}</span> 台
                    </Col>
                    {
                        device.data.deviceStatistics.map((item) => {
                            return <Col key={item.typeId}>
                                {item.typeName}：<span className='total_num'>{item.count}</span> 台
                            </Col>;
                        })
                    }
                </Row>
            </div>
            <Row type="flex" justify="start" className="ui-search-row">
                <Col>
                    <span>设备类型：</span>
                    <Select value={typeId} onChange={(val) => setTypeId(val)} style={{ width: '200px', marginRight:'16px' }}>
                        <Option value=''>全部</Option>
                        {
                            device.data.deviceTypeLists.map((item) => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>;
                            })
                        }
                    </Select>
                </Col>
                <Col>
                    <span>出售状态：</span>
                    <Select value={alloted} onChange={(val) => setAlloted(val)} style={{ width: '200px', marginRight:'16px' }}>
                        <Option value=''>全部</Option>
                        <Option value={0}>待出售</Option>
                        <Option value={1}>已出售</Option>
                    </Select>
                </Col>
                <Col>
                    <span>设备ID：</span>
                    <Input type="text" style={{ width: '200px', marginRight:'16px' }}
                        placeholder="搜索设备ID" value={deviceId}
                        onChange={(e) => setDeviceId(e.target.value)} />
                </Col>
                <Col className="ui-btns-rows">
                    <Button type="primary" onClick={() => searchQuery()}>
                        <Icon type="search" />查询
                    </Button>
                    <Button onClick={() => resetData()}>
                        <Icon type="undo" />重置
                    </Button>
                </Col>
            </Row>
            <Row className="ui-table-row" style={{ height: 'calc(100% - 196px)' }}>
                <EquipmentTable />
            </Row>
            <div className="ui-pagination-layout">
                <Pagination current={device.page}
                    pageSize={device.size}
                    showSizeChanger
                    onChange={(page, pageSize) => setPage(page, pageSize)}
                    onShowSizeChange={(current, pageSize) => setPage(current, pageSize)}
                    total={device.data.deviceAllTotalCount}
                />
                <span>共 {device.data.deviceAllTotalCount} 条</span>
            </div>
        </div>
    );
});
export default Equipment;