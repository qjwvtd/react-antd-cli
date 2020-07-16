// 工作区统计
import React, { Fragment, useReducer, useContext } from 'react';
import { Row, Col, Button } from 'antd';
import { store, Context, reducer } from './store';
function Children1() {
    const { state, dispatch } = useContext(Context);
    return <Fragment>
        <div>
            {state.name}
            <Button onClick={() => {
                dispatch({ type: 'updateName', name: 'zhangxiaofan' });
            }}>click me</Button>
        </div>
    </Fragment>;
}
function Children2() {
    const { state } = useContext(Context);
    return <Fragment>
        <div>
            {state.name}
        </div >
    </Fragment>;
}

function Module4() {
    const [state, dispatch] = useReducer(reducer, store);
    return <Context.Provider value={{ state: state, dispatch: dispatch }}>
        <div className="ui_content_container ui-workAreaCount-body">
            <Row className="titleRow">
                <Col span={12}><h4>使用useContext和useReducer实现组件内数据管理</h4></Col>
            </Row>
            <Children1 />
            <Children2 />
        </div>;
    </Context.Provider>;
}
export default Module4;