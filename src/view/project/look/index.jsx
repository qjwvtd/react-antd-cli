import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Tabs, Button } from 'antd';
import router from '@/common/router';
import lookStore from '@/common/store/project/lookStore';

import BaseInfo from './base.jsx';
import DeviceInfo from './device.jsx';
import SurfaceInfo from './surface.jsx';
const { TabPane } = Tabs;

const LookProject = observer(({ match }) => {
    const pid = match.params.pid;//项目ID
    //返回
    function back() {
        lookStore.clear();
        router.push('/home/project');
    }
    //拦截
    if (!match || !(match.params.pid)) {
        back();
    }
    useEffect(() => {
        return () => { lookStore.clear(); };
    });
    return <Fragment>
        <div className="ui-content-container">
            <Row className="ui-search-row" style={{ borderBottom: '1px solid #f5f5f5' }}>
                <Col span={4}><h4>查看项目</h4></Col>
                <Col span={4} offset={16} className="text-right">
                    <Button onClick={() => back()}>返回</Button>
                </Col>
            </Row>
            <Row className="ui-content-row" style={{ height: 'calc(100% - 57px)' }}>
                <Tabs type="card" style={{ height: '100%' }}>
                    <TabPane tab="基本信息" key="lookbase">
                        <BaseInfo id={pid} />
                    </TabPane>
                    <TabPane tab="项目设备" key="lookdevice">
                        <DeviceInfo id={pid} />
                    </TabPane>
                    <TabPane tab="项目作业面" key="lookwork">
                        <SurfaceInfo id={pid} />
                    </TabPane>
                </Tabs>
            </Row>
        </div>
    </Fragment >;
});
export default LookProject;