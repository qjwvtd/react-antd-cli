import React, { } from 'react';
import { Tabs } from 'antd';
import { LoadingSpin } from '@/view/component';
const ReduxDemo1 = React.lazy(() => import('./redux_demo1'));
const ReduxDemo2 = React.lazy(() => import('./redux_demo2'));
const { TabPane } = Tabs;

//component
export default function ReduxDemo() {
    return <React.Suspense fallback={<LoadingSpin />}>
        <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="redux" key="1">
                <ReduxDemo1 />
            </TabPane>
            <TabPane tab="redux,react-redux" key="2">
                <ReduxDemo2 />
            </TabPane>
        </Tabs>
    </React.Suspense>;
}
