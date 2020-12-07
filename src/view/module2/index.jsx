import React, { Fragment, useEffect, useState } from 'react';
import arrayToLinkList from '@/common/utils/linkList';
const Module2 = () => {
    const [linkList, setLinkList] = useState({});
    useEffect(() => {
        const arr = [
            { name: 'Andy', age: 12 },
            { name: 'Tom', age: 52 },
            { name: 'Pit', age: 62 },
            { name: 'Cat', age: 42 },
            { name: 'Jety', age: 32 },
            { name: 'Jake', age: 5 }
        ];
        const linkListData = arrayToLinkList(arr);
        setLinkList(linkListData);
    }, []);
    return <Fragment>
        <p>数组转化为链表</p>
        <div className="autowrap">{JSON.stringify(linkList)}</div>
    </Fragment>;
};

export default Module2;
