import React, { Fragment } from 'react';
import { Tabs } from 'antd';
import Test1 from './index1';
import Test2 from './index2';
const { TabPane } = Tabs;

export default function Test() {
    return <Fragment>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
                <Test1 />
            </TabPane>
            <TabPane tab="Tab 2" key="2">
                <Test2 />
            </TabPane>
        </Tabs>
    </Fragment>;
}



