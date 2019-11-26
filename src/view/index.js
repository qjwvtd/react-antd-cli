import React, { PureComponent, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
//导入监听器
import hashHistory from '@/common/router';
//全局顶层模块
import PageNotFound from '@/view/404';
import Main from '@/view/main';
import Home from '@/view/home';
import Login from '@/view/user/login';
import SetPassword from '@/view/user/setPassword';

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
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/setPassword" component={SetPassword} />
                        <Route exact path="/" component={Main} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}