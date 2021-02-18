import React, { Fragment } from 'react';
import { Input, Card, Row, Col, InputNumber, Rate, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { initProject } from './action';
import GilrInfo from './girl';
import { useGloblaStore } from './store';

function ProjectInfo() {
    const [state, dispatch] = useGloblaStore();
    //更新地址
    function updateAddress(value) {
        dispatch({ type: 'update_project_address', value: value });
    }
    //异步演示
    function asyncUpdateDemo() {
        dispatch.async(initProject());
    }
    return <div>
        <p><b>✦,项目信息</b>:</p>
        <div>
            {state.project.name},{state.project.address}
            <Button type="link" onClick={asyncUpdateDemo}>
                <RedoOutlined />刷新项目信息
            </Button>
        </div>
        <Input
            value={state.project.address}
            onChange={(e) => {
                updateAddress(e.target.value);
            }}
        />
        {/* 项目信息更新也不会导致GilrInfo的重渲染 */}
        <GilrInfo />
    </div>;
}
function GoodsInfo() {
    const [state, dispatch] = useGloblaStore();
    return <Fragment>
        <p style={{ paddingTop: '24px' }}><b>✦,商品信息</b>: </p>
        <Row>
            <Col span={6}>{state.good.name}</Col>
            <Col span={6}>{state.good.type}</Col>
            <Col span={6}>{state.good.num}</Col>
            <Col span={6}>
                <InputNumber
                    style={{ width: '100px' }}
                    value={state.good.num}
                    onChange={(value) => {
                        dispatch({ type: 'update_good_num', value: value });
                    }}
                />
            </Col>
        </Row>
    </Fragment >;
}

//component
function App() {
    const [state] = useGloblaStore();
    return <Fragment>
        <ProjectInfo />
        <GoodsInfo />
        <p></p>
        <p>{JSON.stringify(state)}</p>
    </Fragment>;
}

export default function ReduxDemo() {
    return <Card title="redux" bordered={false}>
        <Rate disabled value={5} className="text-success" />
        <p></p>
        <p className="text-success">
            本示例使用原生redux加react hooks功能, 通过在自定义的hook中订阅并发布state和dispatch, 并且store不需要在顶层组件注入, 实现全局管理store的目的
        </p>
        <p>Redux 除了和 React 一起用外，还支持其它界面库。 它体小精悍（只有2kB，包括依赖）。包大小(摘自npm,未压缩Unpacked Size):</p>
        <p>redux: <b>163.0 KB</b></p>
        <App />
    </Card>;
}
