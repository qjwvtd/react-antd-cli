import React, { Fragment, useEffect, useState } from 'react';
import { GloblaProvider, useGloblaStore, globlaApplyStore } from './store';
import Girl from './girl';

function asyncRequestData() {
    const [, dispatch] = globlaApplyStore();
    setTimeout(() => {
        dispatch({ type: 'update_user_nickName', nickName: '龙门砍哥' });
    }, 3000);
}

function Child1() {
    const [state1, dispatch1] = useGloblaStore();
    useEffect(() => {
        let timer = null;
        timer = setTimeout(() => {
            dispatch1({ type: 'update_user_name', name: 'zhangxiaojun' });
        }, 1000);
        timer = setTimeout(() => {
            dispatch1({ type: 'update_user_nickName', nickName: '龙门砍哥' });
        }, 2000);
        timer = setTimeout(() => {
            dispatch1({ type: 'update_user_role', role: '超级管理员' });
        }, 3000);
        asyncRequestData();
        return () => { clearTimeout(timer); };
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
    let [count, setCount] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            if (count < 3) {
                count = count + 1;
                setCount(count);
            }
            if (count === 3) {
                clearInterval(timer);
            }
        }, 1000);
        return () => {
            clearInterval(timer);
            setCount(0);
        };
    }, []);
    return <Fragment>
        <GloblaProvider>
            <p>loading...,{count}</p>
            <Child2 />
            <Child1 />
            <Girl />
        </GloblaProvider>
    </Fragment>;
}



