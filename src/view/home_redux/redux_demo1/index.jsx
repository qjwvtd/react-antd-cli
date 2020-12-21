import React, { Fragment } from 'react';
import { Input, Card, Row, Col, InputNumber, Rate, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { useStore, applyStore } from './store';
//异步演示
function asyncUpdateDemo() {
    const [, dispatch] = applyStore();
    setTimeout(() => {
        const action = {
            type: 'update_project_info',
            name: '大渡河双江口水电站项目',
            address: '阿坝藏族自治区马尔康市'
        };
        dispatch(action);
    }, 500);
}
//更新地址
function updateAddress(value) {
    const [, dispatch] = applyStore();
    dispatch({ type: 'update_project_address', value: value });
}
function ProjectNode() {
    const [state] = useStore();
    return <div>
        <p>
            <b>项目信息</b>:
            {state.project.name},{state.project.address}
            <Button type="link" onClick={asyncUpdateDemo}>
                <RedoOutlined />更新项目信息
            </Button>
        </p>
        <Input
            value={state.project.address}
            onChange={(e) => {
                updateAddress(e.target.value);
            }}
        />

    </div>;
}
function GoodsNode() {
    const [state, dispatch] = useStore();
    return <Fragment>
        <p style={{ paddingTop: '24px' }}><b>商品信息</b>: </p>
        <ul>
            <li style={{ height: '32px', lineHeight: '32px', background: ' #ccc' }}>
                <Row>
                    <Col span={6}>名称</Col>
                    <Col span={6}>类型</Col>
                    <Col span={6}>数量</Col>
                    <Col span={6}>操作</Col>
                </Row>
            </li>
            {
                state.good.list.map((item) => {
                    return <li style={{ height: '32px', lineHeight: '32px' }} key={item.id}>
                        <Row>
                            <Col span={6}>{item.name}</Col>
                            <Col span={6}>{item.type}</Col>
                            <Col span={6}>{item.num}</Col>
                            <Col span={6}>
                                <InputNumber
                                    style={{ width: '100px' }}
                                    value={item.num}
                                    onChange={(value) => {
                                        dispatch({ type: 'update_good_num', value: value, id: item.id });
                                    }}
                                />
                            </Col>
                        </Row>
                    </li>;
                })
            }
        </ul>
    </Fragment >;
}

//component
function App() {
    return <Fragment>
        <ProjectNode />
        <GoodsNode />
    </Fragment>;
}

export default function ReduxDemo() {
    return <Card title="redux" bordered={false}>
        <Rate disabled value={5} className="text-success" />
        <p></p>
        <p>
            本示例使用原生redux加react hooks功能, 通过在自定义的hook中订阅并发布state和dispatch, 并且store不需要在顶层组件注入, 实现全局管理store的目的
        </p>
        <p>Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。包大小(摘自npm,未压缩Unpacked Size):</p>
        <p>redux: <b>163.0 KB</b></p>
        <App />
    </Card>;
}
