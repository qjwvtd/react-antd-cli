import React, { Fragment } from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import history from '@/common/router';
//全局顶层模块
import PageNotFound from '@/view/404';
import Main from '@/view/main';
import HomeWapper from '@/view/home';
import Login from '@/view/login';
import UpdatePassword from '@/view/updatePassword';
//1
import Module1 from '@/view/module1';
//2
import Module2 from '@/view/module2';
//3
import Module3 from '@/view/module3';


export default function View() {
    return <Fragment>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/home">
                    <HomeWapper>
                        {/* 首页默认加载成员管理 */}
                        <Route exact path="/home/module1" component={Module1}></Route>
                        <Route path="/home/module2" component={Module2}></Route>
                        <Route path="/home/module3" component={Module3}></Route>
                    </HomeWapper>
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    </Fragment >;
}
