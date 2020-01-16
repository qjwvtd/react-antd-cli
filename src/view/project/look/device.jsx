import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Col, Input, Select, Button, Icon, Pagination } from 'antd';
import lookStore from '@/common/store/project/lookStore';
const { Option } = Select;

function TextTipsView({ name, number }) {
    const areaStyle = { display: 'inline-block', marginRight: '5px' };
    const fontStyle = { color: 'red' };
    return <span style={areaStyle}>{name}  <b style={fontStyle}>{number}</b>台</span>;
}
const DeviceSearchTop = observer(({ id }) => {
    const [deviceId, setDeviceId] = useState(null);
    const [deviceTypeId, setDeviceTypeId] = useState(null);
    function query() {
        lookStore.setDeviceSearchContent(deviceId, deviceTypeId);
        lookStore.initAllotedDeviceList(id);
    }
    return <Row className="ui-search-row">
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
        </Col>
    </Row>;
});
const DeviceInfo = observer(({ id }) => {
    lookStore.initAllotedDeviceList(id);
    const dataSource = [
        { deviceId: 'dh56236426', typeId: '659e555dv4d5d', typeName: '智能安全帽V1.0[MOCK数据]' },
        { deviceId: 'dh69578453', typeId: '5f5d55d5ffd5', typeName: '通讯基站V1.0[MOCK数据]' }
    ];
    const columns = [
        { title: '设备ID', dataIndex: 'deviceId' },
        { title: '设备类型', dataIndex: 'typeName' }
    ];
    return <Fragment>
        <div className="ui-matchDevices-container">
            <h4>当前项目已有设备</h4>
            <div style={{ background: 'rgba(255, 255, 204, 1)', height: '32px', lineHeight: '32px' }}>
                <TextTipsView name={'智能安全帽V1.0[MOCK数据]'} number={100} />
                <TextTipsView name={'通讯基站V1.0[MOCK数据]'} number={90} />
            </div>
            <DeviceSearchTop id={id} />
            <div style={{ marginTop: '8px', maxHeight: '480px' }}>
                <Table dataSource={dataSource} columns={columns} pagination={false} rowKey={'deviceId'} />
            </div>
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
        </div>
    </Fragment>;
});
export default DeviceInfo;