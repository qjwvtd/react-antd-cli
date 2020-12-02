import React, { Fragment, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { inject, observer } from 'mobx-react';
const InputGroup = Input.Group;
/**
 * mobx跨组件通信
 * 涉及多个store的引用,inject('store1')(inject('store2')(observer(FC)))
 */
const Module1 = inject('userStore')(inject('personStore')(observer(({ userStore, personStore }) => {
    useEffect(() => {
        personStore.init();
    }, []);
    return <Fragment>
        this is my Member page
        <p>这是成员管理界面</p>
        <hr />
        <h4>修改user</h4>
        <Row>
            <Col offset={8} span={8}>
                <Input
                    value={userStore.data.name}
                    onChange={(e) => userStore.updateUserName(e.target.value)}
                />
            </Col>
        </Row>
        <hr />
        <h4>多个store使用示例</h4>
        <Row>
            <Col offset={4} span={16}>
                {
                    personStore.list.map((item, index) =>
                        <InputGroup compact key={index}>
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
                    )
                }
            </Col>
        </Row>
    </Fragment>;
})));
export default Module1;
