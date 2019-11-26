import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
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


export default class MainRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is main route page'
        };
    }
    render() {
        return (
            <Fragment>
                <Switch>
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
}