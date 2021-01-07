import React, { Fragment, useState } from "react";
import { Card, Rate, Input } from 'antd';
import constate from "constate";

// 1️⃣ Create a custom hook as usual
function useCounter() {
    const [count, setCount] = useState('');
    const increment = (e) => setCount(e.target.value);
    return { count, increment };
}

// 2️⃣ Wrap your hook with the constate factory
const [CounterProvider, useCounterContext] = constate(useCounter);

function InputChange() {
    // 3️⃣ Use context instead of custom hook
    const { count, increment } = useCounterContext();
    return <Input
        valur={count}
        onChange={increment}
    />;
}

function Count() {
    // 4️⃣ Use context in other components
    const { count } = useCounterContext();
    return <span>{count}</span>;
}

export default function ConstateDemo() {
    // 5️⃣ Wrap your components with Provider
    return <Fragment>
        <Card title="constate" bordered={false}>
            <Rate disabled value={3} className="text-success" />
            <p></p>
            <p>
                constate 本质上依然是将 Context 进行封装，
                建立父与子组件之间的通信来简化基于 Context 的状态共享，
                这种方式在 hooks 之前就已经存在，不过是使用类组件+高阶组件的方式实现。
                ,包大小(摘自npm,未压缩Unpacked Size):
            </p>
            <p>constate: <b>24 kB</b></p>
            <CounterProvider>
                <Count />
                <InputChange />
            </CounterProvider>
        </Card>
    </Fragment>;
}
