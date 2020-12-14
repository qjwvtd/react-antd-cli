import React, { Fragment, useReducer, useContext, useEffect } from 'react';
import { Row, DatePicker, Button, Card } from 'antd';
import moment from 'moment';
import { store, Context, dateFormat } from './state/store';
import reducer from './state/reducer';
import actions from './state/action';
import { initData } from './initData';
const { RangePicker } = DatePicker;
// 工作区统计

function Children1() {
    const { state, dispatch } = useContext(Context);
    return <Fragment>
        <div>
            {state.name}
            <Button onClick={() => {
                dispatch({ type: actions.update_name, name: 'zhangxiaofan' });
            }}>click me</Button>
        </div>
    </Fragment>;
}

function Children2() {
    const { state } = useContext(Context);
    console.log(state);
    return <Fragment>
        <div>
            {/* {state.name} */}
            {JSON.stringify(state)}
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
        dispatch({ type: actions.update_date, start: moment(dateString[0], dateFormat), end: moment(dateString[1], dateFormat) });
    }
    const dateVal = [
        moment(state.startTime, dateFormat),
        moment(state.endTime, dateFormat)
    ];
    useEffect(() => {
        initData((arr) => {
            dispatch({ type: actions.update_list, list: arr });
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

function LocalState() {
    const [state, dispatch] = useReducer(reducer, store);
    return <Context.Provider value={{ state: state, dispatch: dispatch }}>
        <Card title="局部状态管理">
            <Children1 />
            <Children2 />
            <StartAndEndTime />
        </Card>
    </Context.Provider>;
}
export default LocalState;
