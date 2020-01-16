import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { getSurfaceDetail } from '@/common/api/surface';
export default function SurfaceDetail({ visible, setVisible, id }) {
    const [currentData, setCurrentData] = useState({});
    function handleOk() {
        setVisible(false);
    }
    useEffect(() => {
        if (visible && id) {
            getSurfaceDetail(id).then((res) => {
                if (res.code === 200) {
                    setCurrentData(res.data);
                }
            });
        }
    }, [visible, id]);
    return <Fragment>
        <Modal
            title="作业面详情"
            visible={visible}
            onCancel={() => handleOk()}
            footer={
                <div className="text-center">
                    <Button type="primary" onClick={() => handleOk()}>关闭</Button>
                </div>
            }
        >
            <section className="custom-detail-section">
                <Row>
                    <Col span={12}>
                        <span>作业面名称</span>
                        <p>{currentData.name}</p>
                    </Col>
                    <Col span={11} offset={1}>
                        <span>海拔高度</span>
                        <p>{currentData.altitudeLow} 至 {currentData.altitudeHigh}米</p>
                    </Col>
                    <Col span={12}>
                        <span>创建时间</span>
                        <p>{currentData.createTime}</p>
                    </Col>
                    <Col span={11} offset={1}>
                        <span>状态</span>
                        <p>{currentData.status === 0 ? <span style={{ color: 'green' }}>启用</span> : <span style={{ color: 'red' }}>禁用</span>}</p>
                    </Col>
                    <Col span={12}>
                        <span>电子围栏</span>
                        <p>{currentData.polygons ? <span style={{ color: 'green' }}>已上传</span> : <span style={{ color: 'red' }}>缺失</span>}</p>
                    </Col>
                    <Col span={11} offset={1}>
                        <span>基站位置</span>
                        <p>{currentData.bslocations ? <span style={{ color: 'green' }}>已上传</span> : <span style={{ color: 'red' }}>缺失</span>}</p>
                    </Col>
                    <Col span={12}>
                        <span>介绍</span>
                        <p>{currentData.introduce || '暂无'}</p>
                    </Col>
                </Row>
            </section>
        </Modal>
    </Fragment>;
}