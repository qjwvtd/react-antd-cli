import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Input, Rate } from 'antd';
import { useStore, Wapper, observer, actions } from './store';

//test observer
const TestObserver = observer(({ state, dispatch }) => {
    const { initGirl, initProject } = actions;
    useEffect(() => {
        dispatch(initGirl());
        dispatch(initProject());
    }, []);
    return <p>{state.project.desc}</p>;
});
//Test Observer custom props
function TestObserverCustomProps({ state, name }) {
    return <Fragment>
        <p>{state.project.desc}</p>
        <p>{name}</p>
    </Fragment>;
}
const TestObserver2 = observer(<TestObserverCustomProps name={'custom props'} />);

function StoreView() {
    const [state, dispatch] = useStore();
    const { updateProjectDesc } = actions;
    function Girl() {
        return <Card title={'girl'}>
            {
                state.girl.list.map((item) => {
                    return <Row key={item._id}>
                        <Col span={6}><img src={item.url} style={{ width: '98%' }} /></Col>
                        <Col span={18}><p>{item.author}</p><p>{item.desc}</p></Col>
                        <Col span={24}><p></p></Col>
                    </Row>;
                })
            }
        </Card>;
    }
    function Project() {
        function handleChange(value) {
            dispatch(updateProjectDesc(value));
        }
        return <Card title={'project'}>
            <p className="text-gray">项目demo有本地接口,请先运行npm run server</p>
            <p>{state.project.name}</p>
            <p>{state.project.desc}</p>
            <Input
                // value={state.project.desc}
                // onChange={(e) => handleChange(e.target.value)}
                defaultValue={state.project.desc}
                onBlur={(e) => handleChange(e.target.value)}
            />
        </Card>;
    }
    return <Fragment>
        <Row>
            <Col span={11}>
                <Girl />
            </Col>
            <Col span={11} offset={2}>
                <Project />
                <TestObserver />
                <TestObserver2 />
            </Col>
        </Row>
    </Fragment>;
}

export default function ReduxDemo3() {
    return <Wapper>
        <Card title="redux,react-redux,redux-thunk" bordered={false}>
            <Rate disabled value={5} className="text-success" />
            <p></p>
            <p>redux,react-redux,redux-thunk</p>
            <p>包大小(摘自npm,未压缩Unpacked Size):</p>
            <p>redux: <b>163.0 KB</b></p>
            <p>react-redux: <b>271.0 KB</b></p>
            <p>redux-thunk: <b>17.7 KB</b></p>
            <StoreView />
        </Card>
    </Wapper>;
}



