import React from 'react';
import { observer } from 'mobx-react';
import fault from '@/common/store/fault';
import { Modal, Button, Card, Table } from 'antd';

//报障详情弹窗
const FaultDetail = observer(({ visible, setVisible }) => {
    const handleCancel = () => {
        setVisible(false);
    };
    const columns = [
        {
            title: '故障模块',
            dataIndex: 'module'
        },
        {
            title: '故障描述',
            dataIndex: 'description'
        },
        {
            title: '上报类型',
            dataIndex: 'reportType',
            render: (text) => {
                let _text = text === 1 ? '系统上报' : '人工上报';
                return <span>{_text}</span>;
            }
        },
        {
            title: '上报时间',
            dataIndex: 'reportTime'
        }
    ];
    return <Modal
        title="设备报障详情"
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
                    <span>{fault.data.deviceFaultInfo.deviceId}</span>
                </p>
                <p>
                    <span className="text-gay">设备类型：</span>
                    <span>{fault.data.deviceFaultInfo.typeName}</span>
                </p>
                <p>
                    <span className="text-gay">出售状态：</span>
                    <span>{fault.data.deviceFaultInfo.alloted === 1 ? '已出售' : '待出售'}</span>
                </p>
                <p>
                    <span className="text-gay">所属项目：</span>
                    <span>{fault.data.deviceFaultInfo.projectName}</span>
                </p>
            </Card>
            <Card title="故障信息" bordered={false}>
                <Table columns={columns}
                    dataSource={fault.data.deviceFaultInfo.faults}
                    pagination={false}
                    rowKey="reportTime" />
            </Card>
        </div>
    </Modal>;
});

export default FaultDetail;