import React, { Fragment } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function PageNotFind() {
    return <Fragment>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><Link to="/">返回首页</Link></Button>}
        />
    </Fragment>;
}