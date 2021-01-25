import React, { Fragment, useEffect } from 'react';
import { Card } from 'antd';
import { hookStateMap, createHookStore } from './store';


export default function Test() {
    useEffect(() => {
        createHookStore(hookStateMap);
    }, []);
    return <Fragment>
        <Card title="test" bordered={false}></Card>
    </Fragment>;
}
