import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//导入监听器
import hashHistory from '@/common/router';
//全局顶层模块
import PageNotFound from '@/view/404';
import Main from '@/view/main/index.jsx';
import Home from '@/view/home';
import Login from '@/view/user/login';
import QrcodeLogin from '@/view/user/qrcodeLogin';
import SetPwdCheckMobile from '@/view/user/setPassword';
import SetPwd from '@/view/user/setPassword/setPwd.js';

export default function View(props) {
    const { } = props;
    return (
        <Router history={hashHistory}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/qrcodeLogin" component={QrcodeLogin} />
                <Route path="/home" component={Home} />
                <Route path="/setPwdCheckMobile" component={SetPwdCheckMobile} />
                <Route path="/setPwd" component={SetPwd} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}
