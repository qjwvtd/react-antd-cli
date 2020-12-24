import React, { Fragment, useEffect } from 'react';
import { useGirlStore, GirlProvider, girlApplyStore } from './store/girl';
import { getGirlDataApi } from '@/common/api/public';

function initGirlInfo() {
    const [, dispatch] = girlApplyStore();
    getGirlDataApi().then((res) => {
        if (res.status === 100) {
            const action = {
                type: 'update_girl_data',
                data: res.data[0]
            };
            dispatch(action);
        }
    });
}
function GirlBody() {
    const [data] = useGirlStore();
    const info = data.girl.info || {};
    return <div>
        <b>{info.author}</b>
        <p>{info.desc}</p>
        <img src={info.url} style={{ width: '240px' }} />
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
