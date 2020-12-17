import React, { } from 'react';
import { Row, Col, Input, Card, Button, Rate } from 'antd';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import userState, { showState, filterShowState } from './store';
function ShowUserInfo() {
    const [user] = useRecoilState(userState);
    const [flag, setFlag] = useRecoilState(showState);
    const str = useRecoilValue(filterShowState);
    function showDescriptionFlag() {
        setFlag(!flag);
    }
    return <div>
        <p>修改时间: {user.time}</p>
        <p>名称: {user.name}</p>
        <p>角色: {user.role}</p>
        <p>地址: {user.address}</p>
        <p>
            描述:
            <span> {flag ? user.description : '--'}</span>
            <Button type="link" onClick={showDescriptionFlag}>{str}</Button>
        </p>
    </div>;
}
function UserInfo() {
    const [user, setUser] = useRecoilState(userState);
    function updateUserName(value) {
        //复杂对象user的属性是只读的,只能重新拷贝一个
        const data = Object.assign({}, user);
        data.name = value;
        const current = new Date();
        const timmer = (current.getMonth() + 1) + '/' + current.getDate() + ' ' + current.getHours() + ':' + current.getMinutes() + ':' + current.getSeconds();
        data.time = timmer;
        setUser(data);
    }
    return <Card title="Recoil" bordered={false}>
        <Rate disabled value={4} className="text-success" />
        <p></p>
        <p>
            Recoil基于Hooks的API以及它的直观性。与其他一些库相比，Recoil比大多数库更容易。
            两个重要且常用的API(atom,selector),atom用于申明变量即state,selector通常用于计算值 ,
            相当于mobx的complated功能,这个值可以直接渲染到组件里。
            包大小(摘自npm,未压缩Unpacked Size):
        </p>
        <p>Recoil: <b>1.27 MB</b></p>
        <ShowUserInfo />
        <Row>
            <Col span={3} style={{ lineHeight: '32px' }}>修改名称: </Col>
            <Col span={6}>
                <Input value={user.name} onChange={e => updateUserName(e.target.value)} />
            </Col>
        </Row>
    </Card>;
}
export default function Module6() {
    return <RecoilRoot>
        <UserInfo />
    </RecoilRoot>;
}
