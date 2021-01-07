import React, { Fragment, useEffect } from 'react';
import { Card, Rate, Input, InputNumber } from 'antd';
import { useGloblaStroe, useGloblaProvider } from './store/globla';
import GirlApp from './girl';

function TestXinglen({ len, xh }) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i + 1);
    }

    return <Fragment>
        <p><b>{len}个span</b></p>
        <p>
            {
                arr.map(item => {
                    const style = { padding: '1px 3px', color: xh === item ? 'red' : '#ccc' };
                    return <span key={item} style={style}>{item} , </span>;
                })
            }
        </p>
    </Fragment>;
}

function GloblaComponentApp() {
    const [state, dispatch] = useGloblaStroe();
    useEffect(() => {
        dispatch({ type: 'init_project', data: { name: '双江口项目', desc: '关于双江口项目的一些描述' } });
        dispatch({ type: 'init_user', data: { name: '龙门砍哥', role: '超级管理员' } });
    }, []);
    function handleChange(e) {
        dispatch({ type: 'update_project_desc', value: e.target.value });
    }
    function updateUserLen(num) {
        dispatch({ type: 'update_xh', value: num });
    }
    return <Fragment>
        <p>{state.project.name}</p>
        <p>{state.project.desc}</p>
        <p>{state.user.name}</p>
        <p>{state.user.role}</p>
        <Input
            value={state.project.desc}
            onChange={handleChange}
        />
        <p></p>
        <InputNumber
            value={state.user.index}
            onChange={updateUserLen}
        />
        <TestXinglen len={state.user.len} xh={state.user.index} />
    </Fragment>;
}
const GloblaApp = () => useGloblaProvider(GloblaComponentApp);

function Module4() {
    return <Fragment>
        <Card title="react hook state manage" bordered={false}>
            <Rate disabled value={4.5} className="text-success" />
            <p></p>
            <p>用useContext和useReducer封装的状态管理机,全局状态管理器,代替redux,mobx,...,等第三方库</p>
            <GloblaApp />
            <GirlApp />
        </Card>
    </Fragment>;
}
export default Module4;
