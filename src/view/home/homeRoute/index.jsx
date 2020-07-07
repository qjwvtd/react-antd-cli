import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
//404
import PageNoFind from '@/view/404';
//成员管理
import MemberManager from '@/view/member';
//设备管理
import Equipment from '@/view/equipment';
//项目设置
import ProjectSetting from '@/view/projectSetting';


export default function HomeRoute() {
    return <Fragment>
        <Switch>
            {/* 首页默认加载成员管理 */}
            <Route exact path="/home" component={MemberManager}></Route>
            <Route exact path="/home/member" component={MemberManager}></Route>
            <Route path="/home/equipment" component={Equipment}></Route>
            <Route path="/home/setting" component={ProjectSetting}></Route>
            <Route component={PageNoFind} />
        </Switch>
    </Fragment>;
}