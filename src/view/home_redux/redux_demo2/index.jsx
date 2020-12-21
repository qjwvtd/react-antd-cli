import React, { Fragment } from 'react';
import { Card, Rate, Row, Col, InputNumber } from 'antd';
import GlobalProvider from './store';
import connectGood from './store/good';
//食物组件
const GoodNode = connectGood((props) => {
    const { list, updateGoodNum } = props;
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
                list.map((item) => {
                    return <li style={{ height: '32px', lineHeight: '32px' }} key={item.id}>
                        <Row>
                            <Col span={6}>{item.name}</Col>
                            <Col span={6}>{item.type}</Col>
                            <Col span={6}>{item.num}</Col>
                            <Col span={6}>
                                <InputNumber
                                    style={{ width: '100px' }}
                                    value={item.num}
                                    onChange={(value) => updateGoodNum(item.id, value)}
                                />
                            </Col>
                        </Row>
                    </li>;
                })
            }
        </ul>
    </Fragment >;
});
//统计组件
const GoodCount = connectGood(({ count }) => {
    const arr = Object.keys(count);
    return <Row>
        {
            arr.map((item) => {
                return <Col key={count[item]} span={8} offset={1}>
                    <p>{item}: {count[item]}</p>
                </Col>;
            })
        }
    </Row>;
});
//component
function App() {
    return <GlobalProvider>
        <GoodNode />
        <GoodCount />
    </GlobalProvider>;
}

export default function ReduxDemo2() {
    return <Card title="redux,react-redux" bordered={false}>
        <Rate disabled value={5} className="text-success" />
        <p></p>
        <p>
            本示例使用原生redux加react-redux
        </p>
        <p>包大小(摘自npm,未压缩Unpacked Size):</p>
        <p>redux: <b>163.0 KB</b></p>
        <p>react-redux: <b>271 KB</b></p>
        <App />
    </Card>;
}
