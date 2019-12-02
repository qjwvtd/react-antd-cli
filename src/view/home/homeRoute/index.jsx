import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
//首页公共头部
import HomeHead from '@/view/home/homeHead';
//404
import PageNoFind from '@/view/404';
//成员管理
import MemberManager from '@/view/member';
//设备管理
import Equipment from '@/view/equipment';
//安全中心
import SafeCenter from '@/view/safeCenter';
//作业面信息
import WorkScope from '@/view/workScope';
//项目设置
import ProjectSetting from '@/view/projectSetting';


export default function HomeRoute(props) {
    const { title } = props;
    return (
        <Fragment>
            <HomeHead title={title} />
            <Switch>
                {/* 首页默认加载成员管理 */}
                <Route exact path="/home" component={MemberManager}></Route>
                <Route exact path="/home/member" component={MemberManager}></Route>
                <Route path="/home/equipment" component={Equipment}></Route>
                <Route path="/home/safe" component={SafeCenter}></Route>
                <Route path="/home/scope" component={WorkScope}></Route>
                <Route path="/home/setting" component={ProjectSetting}></Route>
                <Route component={PageNoFind} />
            </Switch>
        </Fragment>
    );
}