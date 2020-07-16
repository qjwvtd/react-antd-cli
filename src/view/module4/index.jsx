import React, { Fragment, useReducer, useContext, useEffect } from 'react';
import { Row, Col, DatePicker, Button } from 'antd';
import moment from 'moment';
import { store, Context, dateFormat } from './state/store';
import reducer from './state/reducer';
import { initData } from './state/action';
const { RangePicker } = DatePicker;
// 工作区统计

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

function StartAndEndTime() {
    const { state, dispatch } = useContext(Context);
    function onStartEndDateChange(value, dateString) {
        if (dateString[0].length === 0) {
            dateString[0] = state.startTime;
        }
        if (dateString[1].length === 0) {
            dateString[1] = state.endTime;
        }
        dispatch({ type: 'updateDate', start: moment(dateString[0], dateFormat), end: moment(dateString[1], dateFormat) });
    }
    const dateVal = [
        moment(state.startTime, dateFormat),
        moment(state.endTime, dateFormat)
    ];
    useEffect(() => {
        initData((arr) => {
            dispatch({ type: 'updateList', list: arr });
        });
    }, []);
    return <Fragment>
        <br />
        <Row>
            <label>起止时间:&nbsp;</label>
            <RangePicker format={dateFormat} value={dateVal} onChange={onStartEndDateChange} allowClear={false} />
        </Row>
        <br />
        <Row>
            {JSON.stringify(state.list)}
        </Row>
    </Fragment>;
}

function Module4() {
    const [state, dispatch] = useReducer(reducer, store);
    return <Context.Provider value={{ state: state, dispatch: dispatch }}>
        <div className="ui_content_container">
            <Row className="titleRow">
                <Col span={24}><h4>使用useContext和useReducer实现组件内数据管理</h4></Col>
            </Row>
            <Children1 />
            <Children2 />
            <StartAndEndTime />
        </div>
    </Context.Provider>;
}
export default Module4;