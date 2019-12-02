import React, { PureComponent, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//导入监听器
import hashHistory from '@/common/router';
//全局顶层模块
import PageNotFound from '@/view/404';
import Main from '@/view/main';
import Home from '@/view/home';
import Login from '@/view/user/login';
import QrcodeLogin from '@/view/user/qrcodeLogin';
import SetPwdCheckMobile from '@/view/user/setPassword';
import SetPwd from '@/view/user/setPassword/setPwd.js';

export default class View extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        return (
            <Router history={hashHistory}>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login" component={Login} />
                        <Route path="/qrcodeLogin" component={QrcodeLogin} />
                        <Route path="/home" component={Home} />
                        <Route path="/setPwdCheckMobile" component={SetPwdCheckMobile} />
                        <Route path="/setPwd" component={SetPwd} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}