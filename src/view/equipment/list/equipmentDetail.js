import React from 'react';
import { observer } from 'mobx-react';
import device from '@/common/store/device';
import { Modal, Button, Card, Table } from 'antd';

//设备详情弹窗
const EquipmentDetail = observer(({ visible, setVisible }) => {
    const handleCancel = () => {
        setVisible(false);
    };
    const columns = [
        {
            title: '模块名称',
            dataIndex: 'deviceModule'
        },
        {
            title: '生产厂家',
            dataIndex: 'manufacturer'
        },
        {
            title: '生产时间',
            dataIndex: 'productTime'
        },
        {
            title: '有效期限',
            dataIndex: 'validPeriod',
            render: (text) => {
                let txt = text + '年';
                let _text = text ? txt : '';
                return <span>{_text}</span>;
            }
        }
    ];
    return <Modal
        title="设备详情"
        width={1000}
        centered={true}
        visible={visible}
        onCancel={() => handleCancel()}
        footer={
            <div className="text-center">
                <Button onClick={() => handleCancel()}>返回</Button>
            </div>
        }>
        <div style={{ maxHeight: '400px', overflow: 'hidden', overflowY: 'auto' }}>
            <Card title="基本信息" bordered={false}>
                <p>
                    <span className="text-gay">设备ID：</span>
                    <span>{device.data.deviceAllInfo.deviceId}</span>
                </p>
                <p>
                    <span className="text-gay">设备类型：</span>
                    <span>{device.data.deviceAllInfo.typeName}</span>
                </p>
                <p>
                    <span className="text-gay">出售状态：</span>
                    <span>{device.data.deviceAllInfo.alloted === 1 ? '已出售' : '待出售'}</span>
                </p>
                <p>
                    <span className="text-gay">所属项目：</span>
                    <span>{device.data.deviceAllInfo.projectName}</span>
                </p>
            </Card>
            <Card title="模块信息" bordered={false}>
                <Table columns={columns}
                    dataSource={device.data.deviceAllInfo.modules}
                    pagination={false}
                    rowKey="id" />
            </Card>
        </div>
    </Modal>;
});
export default EquipmentDetail;