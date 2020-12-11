import React, { Fragment, useState } from 'react';
import { Card, Button } from 'antd';
import { arrayToLinkList } from '@/common/utils';
const arr = [
    { name: 'Andy', age: 12 },
    { name: 'Tom', age: 52 },
    { name: 'Pit', age: 62 },
    { name: 'Cat', age: 42 },
    { name: 'Jety', age: 32 },
    { name: 'Jake', age: 5 }
];
const Module1 = () => {
    const [linkList, setLinkList] = useState({});
    return <Fragment>
        <Card title="数组转链表" bordered={false}>
            <p className="autowrap">{JSON.stringify(arr)}</p>
            <Button
                onClick={() => {
                    const linkListData = arrayToLinkList(arr);
                    setLinkList(linkListData);
                }}
            >
                点我转换
            </Button>
            <p className="autowrap">{JSON.stringify(linkList)}</p>
        </Card>
    </Fragment>;
};

export default Module1;
