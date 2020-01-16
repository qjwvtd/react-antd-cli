import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'antd';
import lookStore from '@/common/store/project/lookStore';

function TextView({ text }) {
    return <div style={{ height: '32px', lineHeight: '32px' }}>{text || ''}</div>;
}
const BaseInfo = observer(({ id }) => {
    useEffect(() => {
        lookStore.initBaseInfo(id);
    }, []);
    return <Fragment>
        <div className="ui-createproject-container">
            <Row>
                <Col span={6}><span className="text-gay">所属客户:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.customerName} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><span className="text-gay">项目名称:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.name} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><span className="text-gay">项目地址:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.addr} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><span className="text-gay">创建人:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.createName} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><span className="text-gay">创建时间:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.createTime} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><span className="text-gay">项目介绍:</span></Col>
                <Col span={18}>
                    <TextView text={lookStore.base.introduce} />
                </Col>
            </Row>
        </div>
    </Fragment>;
});
export default BaseInfo;