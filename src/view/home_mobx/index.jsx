

import React, { Fragment, useEffect } from 'react';
import { Row, Col, Input, Card, Rate } from 'antd';
import injectAll from '@/common/utils/inject';
const InputGroup = Input.Group;
/**
 * mobx跨组件通信
 */
const Module2 = injectAll(['userStore', 'personStore'])(({ userStore, personStore }) => {
    useEffect(() => {
        personStore.init();
    }, []);
    return <Fragment>
        <Card title="mobx,mobx-react" bordered={false}>
            <Rate disabled allowHalf value={4.5} className="text-success" />
            <p></p>
            <p>
                store在顶层组件全局注入,使用inject引入,
                封装inject函数,可以使用injectAll引用多个store,
                包大小(摘自npm,未压缩Unpacked Size):
            </p>
            <p>Mobx: <b>3.47 MB</b></p>
            <p>Mobx-react: <b>608 kB</b></p>
            <Row>
                <Col span={8}>
                    <Input
                        value={userStore.data.name}
                        onChange={(e) => userStore.updateUserName(e.target.value)}
                    />
                </Col>
            </Row>
            <br />
            <Row>
                <Col span={16}>
                    {
                        personStore.list.map((item, index) =>
                            <Fragment key={index}>
                                <InputGroup compact>
                                    <Input
                                        style={{ width: '50%' }}
                                        value={item}
                                        onChange={(e) => personStore.updateItem(e.target.value, index)}
                                    />
                                    <Input
                                        style={{ width: '50%' }}
                                        disabled
                                        value={item}
                                    />
                                </InputGroup>
                                <br />
                            </Fragment>
                        )
                    }
                </Col>
            </Row>
        </Card>
    </Fragment>;
});
export default Module2;
