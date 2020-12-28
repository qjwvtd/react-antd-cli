import React, { Fragment, useEffect } from 'react';
import { useGirlStore, GirlProvider, girlAsyncStore } from './store/girl';
import { getGirlDataApi } from '@/common/api/public';

function initGirlInfo() {
    girlAsyncStore().then((store) => {
        const [, dispatch] = store;
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                const action = {
                    type: 'init_girl',
                    data: res.data[0]
                };
                dispatch(action);
            }
        });
    });
}
function GirlBody() {
    const [data] = useGirlStore();
    return <div>
        <b>{data.girl.author}</b>
        <p>{data.girl.desc}</p>
        <img src={data.girl.url} style={{ width: '240px' }} />
    </div>;
}
export default function Girl() {
    useEffect(() => {
        initGirlInfo();
    }, []);
    return <Fragment>
        <GirlProvider>
            <p>test girl img</p>
            <GirlBody />
        </GirlProvider>
    </Fragment>;
}
