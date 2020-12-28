import React, { Fragment, useEffect } from 'react';
import { GloblaProvider, useGloblaStore, globlaAsyncStore } from './store';
import Girl from './girl';

function asyncRequestData() {
    globlaAsyncStore().then((store) => {
        const [, dispatch] = store;
        setTimeout(() => {
            dispatch({ type: 'update_user_name', name: 'ZhangXiaoJun' });
            dispatch({ type: 'update_user_nickName', nickName: 'LongMenKanGe' });
            dispatch({ type: 'update_user_role', role: 'Super Admin' });
        }, 2000);
    });
}

function Child1() {
    //可以别名
    const [state1, dispatch1] = useGloblaStore();
    useEffect(() => {
        dispatch1({ type: 'update_user_name', name: '张小军' });
        dispatch1({ type: 'update_user_nickName', nickName: '龙门砍哥' });
        dispatch1({ type: 'update_user_role', role: '超级管理员' });
    }, []);
    return <div>
        <p>{state1.user.name}</p>
        <p>{state1.user.nickName}</p>
        <p>{state1.user.role}</p>
    </div>;
}
function Child2() {
    //别名
    const [state] = useGloblaStore();
    return <div>
        <p>{state.project.name}</p>
    </div>;
}

export default function Test() {
    useEffect(() => {
        asyncRequestData();
    }, []);
    return <Fragment>
        <p>3秒后异步刷新</p>
        <GloblaProvider>
            <Child2 />
            <Child1 />
            <p>异步请求</p>
            <Girl />
        </GloblaProvider>
    </Fragment>;
}



