import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Tabs, Button } from 'antd';
import router from '@/common/router';
import createStore from '@/common/store/project/createStore';

import BaseInfo from './base.jsx';
import DeviceInfo from './device.jsx';
import SurfaceInfo from './surface.jsx';
const { TabPane } = Tabs;

const CreateProject = observer(() => {
    const isHasBaseId = createStore.base.id;
    //返回
    function back() {
        createStore.clear();
        router.push('/home/project');
    }
    useEffect(() => { }, []);
    return <Fragment>
        <div className="ui-content-container">
            <Row className="ui-search-row" style={{ borderBottom: '1px solid #f5f5f5' }}>
                <Col span={4}><h4>创建项目</h4></Col>
                <Col span={4} offset={16} className="text-right">
                    <Button onClick={() => back()}>返回</Button>
                </Col>
            </Row>
            <Row className="ui-content-row" style={{ height: 'calc(100% - 57px)' }}>
                <Tabs type="card" style={{ height: '100%' }}>
                    <TabPane tab="基本信息" key="tabsbase">
                        <BaseInfo />
                    </TabPane>
                    <TabPane tab="项目设备" key="tabsdevice" disabled={!isHasBaseId}>
                        <DeviceInfo />
                    </TabPane>
                    <TabPane tab="项目作业面" key="tabssurface" disabled={!isHasBaseId}>
                        <SurfaceInfo />
                    </TabPane>
                </Tabs>
            </Row>
        </div>
    </Fragment >;
});
export default CreateProject;