import React, { Fragment } from 'react';
import { Button } from 'antd';
import router from '@/common/router';
import { getToken } from '@/common/utils';
//服务器错误页面
export function Error() {
    const state = router.location.state || { show: 'success', message: '未知错误, 跳转未携带数据' };
    if (typeof router.location.state === 'string') {
        state.message = router.location.state;
    }
    state.token = 'Bearer ' + getToken();
    const list = [];
    for (let key in state) {
        const option = {};
        option.key = key;
        option.value = state[key];
        list.push(option);
    }
    return <Fragment>
        <div style={{ height: '100%', background: '#242424', textAlign: 'center' }}>
            <ul style={{ display: 'inline-block', textAlign: 'left', paddingTop: '80px' }}>
                {
                    list.length > 0 && list.map((item) => {
                        return <li key={item.key} style={{ padding: '8px 0' }}>
                            <label style={{ color: '#E36EEC' }}>{item.key}</label>
                            <span style={{ color: '#fff' }}>:&nbsp;&nbsp;</span>
                            <span style={{ color: '#F28B54' }}>{item.value}</span>
                        </li>;
                    })
                }
                <li style={{ paddingTop: '32px' }}>
                    <Button type="link" onClick={() => { window.history.go(-1); }}>
                        返回上一页
                    </Button>&nbsp;&nbsp;
                    <Button type="link" onClick={() => { router.push('/'); }}>
                        返回首页
                    </Button>&nbsp;&nbsp;
                    <Button type="link" onClick={() => { router.push('/login'); }}>
                        重新登录
                    </Button>
                </li>
            </ul>
        </div>
    </Fragment>;
}
