import React, { Fragment, useEffect } from 'react';
import { Card } from 'antd';
import Girl from './girl';
import { useStore, Provider } from './store';

export default function Test() {
    const { state, action } = useStore();
    console.log(state);
    useEffect(() => {
        action.initGirl({ name: '自定义参数' });
        action.initProject();
        action.initUser();
    }, []);
    return <Fragment>
        <Provider>
            <Card title="test" bordered={false}>
                <Girl />
                <p>girl:{state.girl.author}</p>
                <p>project:{state.project.name + ', ' + state.project.address}</p>
                <p>user:{state.user.name + ', ' + state.user.role}</p>
            </Card>
        </Provider>
    </Fragment>;
}
