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
//成员管理
import MemberManager from '@/view/member';
//设备管理
import Equipment from '@/view/equipment';
//项目设置
import ProjectSetting from '@/view/projectSetting';


export default function View() {
    return <Fragment>
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/home">
                    <HomeWapper>
                        {/* 首页默认加载成员管理 */}
                        <Route exact path="/home/member" component={MemberManager}></Route>
                        <Route path="/home/equipment" component={Equipment}></Route>
                        <Route path="/home/setting" component={ProjectSetting}></Route>
                    </HomeWapper>
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    </Fragment >;
}
