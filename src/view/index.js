import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
//store
import user from '@/common/store/user';

export default function View() {
    useEffect(() => {
        !user.data.id && user.init();
    }, []);
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/home">
                    <HomeWapper>
                        {/* 首页默认加载成员管理 */}
                        <Route path="/home/member" component={MemberManager}></Route>
                        <Route path="/home/equipment" component={Equipment}></Route>
                        <Route path="/home/setting" component={ProjectSetting}></Route>
                    </HomeWapper>
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}
