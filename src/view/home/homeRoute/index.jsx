import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <Switch>
                {/*默认'/'加载成员管理模块*/}
                <Route exact path="/" component={MemberManager}></Route>
                <Route path="/member" component={MemberManager}></Route>
                <Route path="/equipment" component={Equipment}></Route>
                <Route path="/safe" component={SafeCenter}></Route>
                <Route path="/scope" component={WorkScope}></Route>
                <Route path="/setting" component={ProjectSetting}></Route>
            </Switch>
        );
    }
}