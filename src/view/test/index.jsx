import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { getGirlDataApi } from '@/common/api/public';
import { getProject } from '@/common/api/project';
import { useStore, Wapper, observer, actions } from './store';

//test observer
const TestObserver = observer(({ state }) => {
    return <p>{state.project.desc}</p>;
});

function StoreView() {
    const [state, dispatch] = useStore();
    const { initGirl, initProject, updateProjectDesc } = actions;
    useEffect(() => {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                dispatch(initGirl(res.data));
            }
        });
        getProject().then((res) => {
            dispatch(initProject(res));
        });
    }, []);
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
            </Col>
        </Row>
    </Fragment>;
}

export default function Test() {
    return <Wapper>
        <StoreView />
    </Wapper>;
}



