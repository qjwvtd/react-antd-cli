import React from 'react';
import { Tabs } from 'antd';
import Demo1 from './demo1';
import Demo2 from './demo2';
const { TabPane } = Tabs;
export default function Module4() {
    return <Tabs defaultActiveKey="1" type="card" size={'small'}>
        <TabPane tab="版本1" key="1">
            <Demo1 />
        </TabPane>
        <TabPane tab="版本2" key="2">
            <Demo2 />
        </TabPane>
    </Tabs>;
}
