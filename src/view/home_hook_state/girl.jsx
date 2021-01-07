import React, { Fragment, useEffect } from 'react';
import { useGirlStroe, useGirlProvider, getGirlAsyncStore } from './store/girl';
import { getGirlDataApi } from '@/common/api/public';

function asyncRequest() {
    const [, dispatch] = getGirlAsyncStore();
    getGirlDataApi().then((res) => {
        if (res.status === 100) {
            const action = { type: 'init_girl', data: res.data[0] };
            dispatch(action);
        }
    });
}
function GirlAppComponentJson() {
    const [state] = useGirlStroe();
    return <Fragment>
        <div>{JSON.stringify(state)}</div>
    </Fragment>;
}

function GirlAppComponent() {
    const [state] = useGirlStroe();
    useEffect(() => {
        asyncRequest();
    }, []);
    return <Fragment>
        <p>{state.girl.author}</p>
        <p>{state.girl.desc}</p>
        <img src={state.girl.url} style={{ width: '320px' }} />
        <hr />
        <GirlAppComponentJson />
    </Fragment>;
}
const GirlApp = () => useGirlProvider(() => {
    return <Fragment>
        <p><b>异步获取数据</b></p>
        <GirlAppComponent />
    </Fragment>;
});
export default GirlApp;
