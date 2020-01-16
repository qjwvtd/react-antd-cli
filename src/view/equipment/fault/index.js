import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import fault from '@/common/store/fault';
import { Row, Col, Input, Select, Button, Icon, Table, Pagination } from 'antd';
import FaultDetail from './faultDetail.js';

const { Option } = Select;

//列表
const EquipmentTable = observer(() => {
    const [visible, setVisible] = useState(false);
    // 查看故障详情
    function showDetail(deviceId) {
        fault.initDeviceFaultinfo(deviceId);
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
            title: '上报类型',
            dataIndex: 'reportType',
            render: (text, record) => {
                const flag = record.reportType === 1;
                const _text = flag ? '系统上报' : '人工上报';
                return <span>{_text}</span>;
            }
        },
        {
            title: '上报时间',
            dataIndex: 'reportTime'
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
            dataSource={fault.data.deviceFaultLists}
            pagination={false}
            rowKey="deviceId" />
        <FaultDetail visible={visible} setVisible={setVisible} />
    </Fragment>;
});


const EquipmentFault = observer(() => {
    const [typeId, setTypeId] = useState('');
    const [alloted, setAlloted] = useState('');
    const [deviceId, setDeviceId] = useState(null);

    // 分页处理
    function setPage(page, pageSize) {
        fault.setPageSize(page,  pageSize);
        fault.initDeviceFaultList(typeId, alloted, deviceId);
    }

    //查询
    function onQueryInfo() {
        fault.setPageSize(1,  10);
        fault.initDeviceFaultList(typeId, alloted, deviceId);
    }
    // 重置
    function resetData() {
        setTypeId('');
        setAlloted('');
        setDeviceId(null);
        fault.setPageSize(1,  10);
        fault.initDeviceFaultList('', '', null);
    }
    // 销毁事件
    function destroy () {
        fault.data.deviceFaultLists = [];
        fault.data.deviceFaultTotalCount = 0;
    }
    useEffect(() => {
        // 获取设备类型
        fault.initDeviceTypeList();
        // 获取设备统计数量
        fault.initDeviceFaultStatistics();
        return destroy;
    }, []);

    return (
        <div className="ui-content-container">
            <div className="ui-total-row">
                <Row type="flex" justify="start" className='total_box'>
                    <Col>
                            当前故障设备总数为：
                        <span className='total_num'>{fault.data.deviceFaultSum ? fault.data.deviceFaultSum : 0}</span> 台
                    </Col>
                    {
                        fault.data.deviceFaultStatistics.map((item) => {
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
                    <Select value={typeId}
                        onChange={(val) => setTypeId(val)}
                        style={{ width: '200px', marginRight:'16px' }}>
                        <Option value=''>全部</Option>
                        {
                            fault.data.deviceTypeLists.map((item) => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>;
                            })
                        }
                    </Select>
                </Col>
                <Col>
                    <span>出售状态：</span>
                    <Select value={alloted}
                        onChange={(val) => setAlloted(val)}
                        style={{ width: '200px', marginRight:'16px' }}>
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
                    <Button type="primary" onClick={() => onQueryInfo()}>
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
                <Pagination current={fault.page}
                    pageSize={fault.size}
                    showSizeChanger
                    onChange={(page, pageSize) => setPage(page, pageSize)}
                    onShowSizeChange={(current, pageSize) => setPage(current, pageSize)}
                    total={fault.data.deviceFaultTotalCount}
                />
                <span>共 {fault.data.deviceFaultTotalCount} 条</span>
            </div>
        </div>
    );
});

export default EquipmentFault;