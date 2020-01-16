import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Col, Select, Input, message, Table, Pagination, Icon } from 'antd';
import createStore from '@/common/store/project/createStore';
import { getDeviceStatistics, addProjectDeviceList } from '@/common/api/device';

const { Option } = Select;

function TextTipsView({ name, number }) {
    const areaStyle = { display: 'inline-block', marginRight: '5px' };
    const fontStyle = { color: 'red' };
    return <span style={areaStyle}>{name}  <b style={fontStyle}>{number}</b>台</span>;
}
const DeviceStockTable = observer(() => {
    const [allotArr, setAllotArr] = useState([]); //待出售列表
    const sellArr = []; //change时存储的出售列表,[{},...]
    useEffect(() => {
        getDeviceStatistics({ alloted: 0 }).then((res) => {
            if (res.code === 200 && res.data && res.data.length > 0) {
                setAllotArr(res.data);
            }
        });
    }, []);
    //设备出售列表
    function setDeviceSellList(option, e) {
        const value = e.target.value;
        const isNumber = /^[1-9]\d*$/.test(value);
        if (!value) { return; }
        if (!isNumber || +value > option.count) {
            message.warning('输入错误或出售数量大于库存量');
            e.target.value = '';
            return;
        }
        function getSellItem(id) {
            for (let i = 0; i < sellArr.length; i++) {
                if (sellArr[i].typeId === id) {
                    return { index: i };
                }
            }
            return false;
        }
        const item = getSellItem(option.typeId);
        if (item.index >= 0) {
            sellArr[item.index].sellNumber = +value;
        } else {
            option.sellNumber = +value;
            sellArr.push(option);
        }
    }
    //出售
    function hanldeSellEvent() {
        if (sellArr.length === 0) { return; }
        const arr = [];
        for (let i = 0; i < sellArr.length; i++) {
            const item = {};
            item.demandCount = sellArr[i].sellNumber;
            item.deviceTypeId = sellArr[i].typeId;
            arr.push(item);
        }
        const sendData = {
            data: arr,
            projectId: createStore.base.id
        };
        addProjectDeviceList(sendData).then((res) => {
            console.log(res);
            if (res.code === 200) {
                message.success('设备已出售并分配到本项目!');
            }
        });
    }
    const columns = [
        { title: '设备类型', dataIndex: 'typeName' },
        { title: '设备数量', dataIndex: 'count' },
        {
            title: '出售数量', dataIndex: '', render: (text, record) => {
                return <Fragment>
                    出售给当前项目
                    <Input
                        type="text"
                        onBlur={(e) => setDeviceSellList(record, e)}
                        style={{ width: '80px', margin: '0 5px' }}
                    />台
                </Fragment>;
            }
        }
    ];
    return <Fragment>
        <h4>设备库存</h4>
        <div style={{ margin: '8px 0' }}>
            <Table dataSource={allotArr} columns={columns} pagination={false} rowKey={'typeName'} />
        </div>
        <div style={{ margin: '8px 0 16px 0', textAlign: 'center' }}>
            <Button type="primary" onClick={() => hanldeSellEvent()}>出售</Button>
        </div>
    </Fragment>;
});
//已出售设备列表
const DeviceAllotedTable = observer(({ id }) => {
    createStore.initAllotedDeviceList(id);
    const [deviceId, setDeviceId] = useState(null);
    const [deviceTypeId, setDeviceTypeId] = useState(null);
    //查询
    function query() {
        createStore.setDeviceSearchContent(deviceId, deviceTypeId);
        createStore.initAllotedDeviceList(id);
    }
    //回收
    function rollbackDevice(item) {
        console.log(item);
    }
    //行checkbox事件
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };
    const dataSource = [
        { deviceId: 'dh56236426', typeId: '659e555dv4d5d', typeName: '智能安全帽V1.0[MOCK数据]' },
        { deviceId: 'dh69578453', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: '24145d5g', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: '5f14v5f4v', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: '55d1v5d12vd', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: 'g51d2v5ded2', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: 'rt781b215wq1v', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' },
        { deviceId: '87w1vd5f1gdg5', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' }
    ];
    const columns = [
        { title: '设备ID', dataIndex: 'deviceId' },
        { title: '设备类型', dataIndex: 'typeName' },
        {
            title: '操作', dataIndex: '', render: (text, record) => {
                return <Button type="link" onClick={() => rollbackDevice(record)}>回收</Button>;
            }
        }
    ];
    return <Fragment>
        <h4>当前项目已有设备</h4>
        <div style={{ background: 'rgba(255, 255, 204, 1)', height: '32px', lineHeight: '32px' }}>
            <TextTipsView name={'智能安全帽V1.0[MOCK数据]'} number={100} />
            <TextTipsView name={'通讯基站V1.0[MOCK数据]'} number={90} />
        </div>
        <Row className="ui-search-row">
            <Col span={6}>
                <span>设备ID:</span>
                <Input type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="设备ID" />
            </Col>
            <Col span={6} offset={1}>
                <span>设备类型:</span>
                <Select value={deviceTypeId} onSelect={(val) => setDeviceTypeId(val)} style={{ width: 'calc(100% - 60px)' }}>
                    <Option value={null}>全部</Option>
                    <Option value={0}>智能安全帽V1.0</Option>
                    <Option value={1}>通讯基站V1.0</Option>
                </Select>
            </Col>
            <Col span={10} className="ui-btns-rows text-right">
                <Button type="primary" onClick={() => query()}><Icon type="search" />查询</Button>
                <Button><Icon type="undo" />重置</Button>
                <Button><Icon type="rollback" />回收</Button>
            </Col>
        </Row>
        <div style={{ marginTop: '8px' }}>
            <Table rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false} rowKey={'deviceId'} />
        </div>
    </Fragment>;
});
const DeviceInfo = observer(() => {
    return <Fragment>
        <DeviceStockTable />
        <DeviceAllotedTable id={createStore.base.id} />
        <div className="ui-pagination-layout">
            <Pagination
                showSizeChanger
                defaultPageSize={5}
                defaultCurrent={1}
                // onShowSizeChange={(p, s) => onShowSizeHandleChange(p, s)}
                // onChange={(p, s) => onHandleChange(p, s)}
                total={1}
            />
            <span>共{1}条</span>
        </div>
    </Fragment>;
});
export default DeviceInfo;