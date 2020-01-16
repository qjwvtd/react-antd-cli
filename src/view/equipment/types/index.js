// 设备类型列表

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import deviceType from '@/common/store/deviceType';
import { Table, Pagination } from 'antd';

const EquipmentType = observer(() => {
    const columns = [
        {
            title: '类型版本号',
            dataIndex: 'version'
        },
        {
            title: '设备类型',
            dataIndex: 'name'
        }
    ];

    useEffect(() => {
        deviceType.initDeviceTypePage(1, 10);
    }, []);

    return (
        <div className="ui-content-container">
            <div className="ui-table-row" style={{ height: 'calc(100% - 72px)' }}>
                <Table columns={columns}
                    dataSource={deviceType.data.deviceTypeLists}
                    pagination={false}
                    rowKey="id" />
            </div>
            <div className="ui-pagination-layout">
                <Pagination current={deviceType.page}
                    pageSize={deviceType.size}
                    showSizeChanger
                    onChange={(page, pageSize) => deviceType.setPageSize(page, pageSize)}
                    onShowSizeChange={(current, pageSize) => deviceType.setPageSize(current, pageSize)}
                    total={deviceType.data.deviceTypeTotalCount}
                />
                <span>共 {deviceType.data.deviceTypeTotalCount} 条</span>
            </div>
        </div>
    );
});
export default EquipmentType;