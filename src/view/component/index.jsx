import React from 'react';
import { Spin } from 'antd';

//红色的*号
export const RedText = () => <a style={{ color: 'red' }}>*</a>;
//loadingSpin
export function LoadingSpin() {
    const hei = window.innerHeight + 'px';
    return <div className="text-center" style={{ height: hei, lineHeight: hei }}>
        <Spin tip="Loading..."></Spin>
    </div>;
}
