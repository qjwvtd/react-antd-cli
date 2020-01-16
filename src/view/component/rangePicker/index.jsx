import React, { Fragment } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const yyyymmdd = "YYYY/MM/DD";

export default function DhRangePicker(props) {
    const { callback, defaultRange } = props;
    function setDateChange(dates, dateStr) {
        let dateArr;
        if (dateStr[0] === "" || dateStr[1] === "") {
            dateArr = null;
        } else {
            dateArr = [
                moment(new Date(dateStr[0]), yyyymmdd),
                moment(new Date(dateStr[1]), yyyymmdd)
            ];
        }
        callback(dateArr);
    }
    return (
        <Fragment>
            <RangePicker
                style={{ width: "240px" }}
                placeholder={["开始日期", "结束日期"]}
                ranges={{ Today: [moment(), moment()] }}
                value={defaultRange}
                onChange={setDateChange}
                format={yyyymmdd}
            />
        </Fragment>
    );
}
