import React, { Fragment, useEffect } from 'react';
import { Input, Card, Row, Col, InputNumber } from 'antd';
import useStore from './state';

function ProjectNode() {
    const { state, dispatch } = useStore();
    return <div>
        <p><b>项目信息</b>: {state.project.name},{state.project.address}</p>
        <Input
            value={state.project.address}
            onChange={(e) => {
                dispatch({ type: 'update_project_address', value: e.target.value });
            }}
        />
    </div>;
}
function GoodsNode() {
    const { state, dispatch } = useStore();
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
                state.goods.map((item) => {
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
    const { state } = useStore();
    useEffect(() => {
        console.log(state);
    }, []);
    return <Fragment>
        <ProjectNode />
        <GoodsNode />
    </Fragment>;
}

export default function ReduxDemo() {
    return <Card title="redux" bordered={false}>
        <p>Redux 是 JavaScript 状态容器，提供可预测化的状态管理。Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。</p>
        <p className="text-red">本示例使用原生redux加react hooks功能, 通过在自定义的hook中订阅并发布state和dispatch, 并且store不需要在顶层组件注入, 实现全局管理store的目的</p>
        <p>包大小(摘自npm,未压缩Unpacked Size):</p>
        <p>redux: <b>163.0 KB</b></p>
        <App />
    </Card>;
}
