import React, { Fragment, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button, Input, message } from 'antd';
import createStore from '@/common/store/project/createStore';
import user from '@/common/store/user';

import Region from "@/view/component/region";
import CustomList from './custom';
import { RedText } from '@/view/component';

import { addProject } from '@/common/api/project';

const { TextArea } = Input;

const BaseInfo = observer(() => {
    const [visible, setVisible] = useState(false);
    //保存基本信息
    function save() {
        const sendData = {
            name: createStore.base.name,
            addr: createStore.base.region + ',' + createStore.base.address,
            provinceCode: createStore.base.area[0].areaCode,
            cityCode: createStore.base.area[1].areaCode,
            countyCode: createStore.base.area[2].areaCode,
            customerId: createStore.base.customer.id,
            introduce: createStore.base.desc,
            latitude: createStore.base.area[2].lat,
            longitude: createStore.base.area[2].lng,
            streetNumber: createStore.base.address,
            userId: user.data.id
        };
        addProject(sendData).then((res) => {
            // console.log(res);
            if (res.code === 200) {
                message.success('项目创建成功,请继续完善项目的设备信息和作业面设置');
                createStore.setProjectId(res.data);
            }
        });
    }
    //设置地址
    function setAreaInfo(list) {
        createStore.setProjectAreaInfo(list);
    }

    useEffect(() => {

    }, []);
    const isHasBaseInfo = () => {
        const isName = createStore.base.name;
        const isCustomer = createStore.base.customer;
        const isRegion = createStore.base.region;
        const isAddress = createStore.base.address;
        return isName && isCustomer && isRegion && isAddress;
    };
    return <Fragment>
        <div className="ui-createproject-container">
            <Row>
                <Col span={6}><RedText />所属客户:</Col>
                <Col span={18}>
                    {createStore.base.customer && createStore.base.customer.company}
                    <Button type="link" onClick={() => setVisible(true)}>选择客户</Button>
                </Col>
            </Row>
            <Row>
                <Col span={6}><RedText />项目名称:</Col>
                <Col span={18}>
                    <Input type="text" value={createStore.base.name} placeholder="项目名称" onChange={(e) => createStore.setProjectName(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><RedText />项目地址:</Col>
                <Col span={18}>
                    <Region callback={(areaList) => setAreaInfo(areaList)} />
                </Col>
            </Row>
            <Row>
                <Col span={6}><RedText />详细地址:</Col>
                <Col span={18}>
                    <Input type="text" value={createStore.base.address} placeholder="项目详细地址" onChange={(e) => createStore.setProjectAddress(e.target.value)} />
                </Col>
            </Row>
            <Row>
                <Col span={6}>创建人:</Col>
                <Col span={18}><Input type="text" disabled value={user.data.name} /></Col>
            </Row>
            <Row>
                <Col span={6}>项目介绍:</Col>
                <Col span={18}>
                    <TextArea rows={4} value={createStore.base.desc} defaultValue="项目介绍" onChange={(e) => createStore.setProjectDesc(e.target.value)} />
                </Col>
            </Row>
            <div className="ui-btns-rows text-center">
                <Button type="primary" onClick={save} disabled={!isHasBaseInfo()}>保存</Button>
            </div>
        </div>
        <CustomList visible={visible} setVisible={setVisible} />
    </Fragment>;
});
export default BaseInfo;