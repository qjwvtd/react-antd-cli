import React, { Fragment, useEffect } from 'react';
import { Card, Rate, Input } from 'antd';
import { useStore, Wapper } from './store';
import GirlApp from './girl';

function View() {
    const { state, action } = useStore();
    const { initProject, initUser, updateProjectAddress } = action;
    useEffect(() => {
        initProject();
        initUser();
    }, []);
    function handleChange(e) {
        updateProjectAddress(e.target.value);
    }
    return <Fragment>
        <p>{state.project.name}</p>
        <p>{state.project.address}</p>
        <p>{state.user.name}</p>
        <p>{state.user.role}</p>
        <Input
            value={state.project.address}
            onChange={handleChange}
        />
        <p></p>
        <GirlApp />
    </Fragment>;
}
function Test() {
    return <Fragment>
        <Card title="react hook state manage" bordered={false}>
            <Rate disabled value={4.5} className="text-success" />
            <p></p>
            <p>用useContext和useReducer封装的状态管理机,全局状态管理器,代替redux,mobx,...,等第三方库</p>
            <Wapper>
                <View />
            </Wapper>
        </Card>
    </Fragment>;
}
export default Test;
