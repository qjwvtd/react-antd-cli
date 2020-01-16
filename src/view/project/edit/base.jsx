import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button, Input, message } from 'antd';
import Region from "@/view/component/region";
import editStore from '@/common/store/project/editStore';
import user from '@/common/store/user';
import CustomList from './custom';
import { shakePrevent } from '@/common/utils';
import { putProjectBaseInfo } from '@/common/api/project';
const { TextArea } = Input;

const BaseInfo = observer(() => {
    const [visible, setVisible] = useState(false);
    const [areaList, setAreaList] = useState([]);
    //更新项目基本信息
    function saveUpdate() {
        shakePrevent(10000);
        editStore.updateRegionInfo(areaList);//手动更新地址信息
        putProjectBaseInfo(editStore.base).then((res) => {
            console.log(res);
            if (res.code === 200) {
                message.success('更新成功!');
            }
        });
    }
    return <Fragment>
        <div className="ui-createproject-container">
            <Row>
                <Col span={6}>所属客户:</Col>
                <Col span={18}>
                    {editStore.base.customerName}
                    <Button type="link" onClick={() => setVisible(true)}>选择客户</Button>
                </Col>
            </Row>
            <Row>
                <Col span={6}>项目名称:</Col>
                <Col span={18}>
                    <Input
                        type="text"
                        value={editStore.base.name}
                        onChange={(e) => editStore.updateBaseProjectName(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>项目地址:</Col>
                <Col span={18}>
                    {
                        editStore.base.provinceCode &&
                        <Region regionId={editStore.base.provinceCode} callback={(arr) => setAreaList(arr)} />
                    }
                </Col>
            </Row>
            <Row>
                <Col span={6}>详细地址:</Col>
                <Col span={18}>
                    <Input
                        type="text"
                        value={editStore.base.streetNumber}
                        onChange={(e) => editStore.updateStreetInfo(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={6}>创建人:</Col>
                <Col span={18}><div style={{ height: '32px', lineHeight: '32px' }}>{user.data.name}</div></Col>
            </Row>
            <Row>
                <Col span={6}>项目介绍:</Col>
                <Col span={18}>
                    <TextArea
                        rows={4}
                        value={editStore.base.introduce}
                        onChange={(e) => editStore.updateBaseDesc(e.target.value)}
                    />
                </Col>
            </Row>
            <Row className="text-center">
                <Button type="primary" onClick={() => saveUpdate()}>保存</Button>
            </Row>
        </div>
        <CustomList visible={visible} setVisible={setVisible} />
    </Fragment>;
});
export default BaseInfo;