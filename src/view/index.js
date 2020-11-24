import React, { Fragment } from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import router from '@/common/router';
//全局顶层模块
import { PageNoFind } from '@/view/exception/404';
import { Error } from '@/view/exception/error';
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
//4
import Module4 from '@/view/module4';


export default function View() {
    return <Fragment>
        <Router history={router}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/home">
                    <HomeWapper>
                        <Switch>
                            {/* 首页默认加载成员管理 */}
                            <Route exact path="/home/module1" component={Module1}></Route>
                            <Route path="/home/module2" component={Module2}></Route>
                            <Route path="/home/module3" component={Module3}></Route>
                            <Route path="/home/module4" component={Module4}></Route>
                            <Route component={PageNoFind} />
                        </Switch>
                    </HomeWapper>
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route path="/error" component={Error} />
                <Route component={PageNoFind} />
            </Switch>
        </Router>
    </Fragment >;
}
