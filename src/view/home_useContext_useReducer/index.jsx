import React, { } from 'react';
import { Tabs, Card } from 'antd';
import LocalState from './local';
import GlobalState from './global';

const { TabPane } = Tabs;

function Module4() {
    function callback(key) {
        console.log(key);
    }
    return <Card title="使用React自带的API,useContext和useReducer实现状态管理">
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="局部" key="1">
                <LocalState />
            </TabPane>
            <TabPane tab="全局" key="2">
                <GlobalState />
            </TabPane>
        </Tabs>
    </Card>;
}
export default Module4;
