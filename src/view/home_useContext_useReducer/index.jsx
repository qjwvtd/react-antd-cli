import React, { } from 'react';
import { Tabs, Card, Rate } from 'antd';
import { LoadingSpin } from '@/view/component';
const LocalState = React.lazy(() => import('./local'));
const GlobalState = React.lazy(() => import('./global'));

const { TabPane } = Tabs;

function Module4() {
    return <React.Suspense fallback={<LoadingSpin />}>
        <Card title="使用React自带的API,useContext和useReducer实现状态管理">
            <Rate disabled allowHalf value={3.5} className="text-success" />
            <p></p>
            <Tabs defaultActiveKey="1">
                <TabPane tab="局部" key="1">
                    <LocalState />
                </TabPane>
                <TabPane tab="全局" key="2">
                    <GlobalState />
                </TabPane>
            </Tabs>
        </Card>
    </React.Suspense>;
}
export default Module4;
