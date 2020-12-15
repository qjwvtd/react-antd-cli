import React from 'react';
import { Spin } from 'antd';

//红色的*号
export const RedText = () => <a style={{ color: 'red' }}>*</a>;
//loadingSpin
export function LoadingSpin() {
    return <div className="text-center" style={{ height: '480px', lineHeight: '480px' }}>
        <Spin tip="Loading..."></Spin>
    </div>;
}
