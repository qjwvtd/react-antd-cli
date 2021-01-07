import React, { Fragment, useEffect } from 'react';
import { Row, Col, Card, Input } from 'antd';
import { getGirlDataApi } from '@/common/api/public';
import { useGloblaStore, GloblaProvider } from './store';

function StoreView() {
    const [state, dispatch] = useGloblaStore();
    useEffect(() => {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                const action = {
                    type: 'init_girl',
                    data: res.data[0]
                };
                dispatch(action);
            }
        });
    }, []);

    function Girl() {
        return <Card title={'girl'}>
            <p>{state.girl.desc}</p>
            <img src={state.girl.url} style={{ width: '120px' }} />
        </Card>;
    }
    function Project() {
        function handleChange(value) {
            const action = {
                type: 'update_project_desc',
                value: value
            };
            dispatch(action);
        }
        return <Card title={'project'}>
            <p>{state.project.name}</p>
            <p>{state.project.desc}</p>
            <Input
                // value={inputValue}
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
            </Col>
        </Row>
    </Fragment>;
}
export default function Test() {
    return <GloblaProvider>
        <StoreView />
    </GloblaProvider>;
}



