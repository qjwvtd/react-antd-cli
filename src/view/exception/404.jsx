import React, { Fragment } from 'react';
import { Result, Button } from 'antd';
import router from '@/common/router';

export function PageNoFind() {
    return <Fragment>
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <div>
                    <Button type="link" onClick={() => { window.history.go(-1); }}>
                        返回上一页
                    </Button>&nbsp;&nbsp;
                    <Button type="link" onClick={() => { router.push('/'); }}>
                        返回首页
                    </Button>&nbsp;&nbsp;
                    <Button type="link" onClick={() => { router.push('/login'); }}>
                        重新登录
                    </Button>
                </div>
            }
        />
    </Fragment>;
}
