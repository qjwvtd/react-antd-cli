import React, { Fragment, useState } from "react";
import { Card } from 'antd';
import constate from "constate";

// 1️⃣ Create a custom hook as usual
function useCounter() {
    const [count, setCount] = useState(0);
    const increment = () => setCount(prevCount => prevCount + 1);
    return { count, increment };
}

// 2️⃣ Wrap your hook with the constate factory
const [CounterProvider, useCounterContext] = constate(useCounter);

function Button() {
    // 3️⃣ Use context instead of custom hook
    const { increment } = useCounterContext();
    return <button onClick={increment} style={{ padding: '8px 24px' }}>+</button>;
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
            <p>
                constate 本质上依然是将 Context 进行封装，
                建立父与子组件之间的通信来简化基于 Context 的状态共享，
                这种方式在 hooks 之前就已经存在，不过是使用类组件+高阶组件的方式实现。
                ,包大小(摘自npm,未压缩Unpacked Size):
            </p>
            <p>constate: <b>24 kB</b></p>
            <CounterProvider>
                <Count />
                <Button />
            </CounterProvider>
        </Card>
    </Fragment>;
}
