import React, { useEffect } from 'react';
import store from '@/common/store/other';

export default function Test() {
    useEffect(() => {
        console.log(store.name);
        setTimeout(() => {
            store.updateName('zhangxiaojun');
        }, 2000);
    }, []);
    return <div>
        <h4>test代码</h4>
        <div>{store.name}</div>
    </div>;
}
