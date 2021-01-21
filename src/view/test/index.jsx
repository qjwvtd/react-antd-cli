import React, { useEffect } from 'react';
import { Wapper, useStore } from './store';
// import GirlApp from './girl';
import TestBak from './index_bak';

const Count = function () {
    const { state, action } = useStore();
    const { initGirl } = action;
    useEffect(() => {
        initGirl();
    }, []);
    return <div>{state.girl.list.length}个女孩</div>;
};
const Project = function () {
    const { state, action } = useStore();
    const { initProject } = action;
    useEffect(() => {
        initProject('test');
    }, []);
    return <div>
        <p>{state.project.info.name}</p>
        <p>{state.project.info.address}</p>
    </div>;
};
export default function Test() {
    return <Wapper>
        <Count />
        <Project />
        {/* <GirlApp /> */}
        <TestBak />
    </Wapper>;
}
