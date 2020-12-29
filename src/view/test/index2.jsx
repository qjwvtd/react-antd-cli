import React, { useEffect } from 'react';
import { useGloblaStore, useGloblaProvider, globlaAsyncStore } from './store2';
import { getGirlDataApi } from '@/common/api/public';

function asyncRequest() {
    const [, dispatch] = globlaAsyncStore();
    getGirlDataApi().then((res) => {
        if (res.status === 100) {
            const action = { type: 'init_girl', data: res.data[0] };
            dispatch(action);
        }
    });
}

function Child() {
    const [state, dispatch] = useGloblaStore();
    useEffect(() => {
        dispatch({ type: 'init_user', data: { name: '龙门砍哥', role: '超级管理员' } });
        dispatch({ type: 'init_project', data: { name: '双江口项目', desc: '关于双江口项目的一些描述' } });
    }, []);
    return <div>
        {JSON.stringify(state)}
    </div>;
}

export default function Test2() {
    const Provider = useGloblaProvider();
    useEffect(() => {
        asyncRequest();
    }, []);
    return <Provider>
        <Child />
    </Provider>;
}
