import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PageNoFind from '@/view/404';
//用户管理-正式用户
import UserFormal from '@/view/user/formal';
//用户管理-正式用户
import UserTrial from '@/view/user/trial';
//项目管理-项目列表
import Projects from '@/view/project';
//项目管理-创建项目
import CreateProject from '@/view/project/create';
//项目管理-查看项目信息
import LookProject from '@/view/project/look';
//项目管理-编辑项目信息
import EditProject from '@/view/project/edit';
//设备管理-列表
import Equipment from '@/view/equipment/list';
//设备管理-报障
import EquipmentFault from '@/view/equipment/fault';
//设备管理-类型
import EquipmentTypes from '@/view/equipment/types';
//消息管理-列表
import MessageList from '@/view/message/list';
//消息管理-推送
import MessagePush from '@/view/message/push';

export default function MainRoutes() {
    const routes = <Fragment>
        {/* 首页默认加载用户管理的正式用户 */}
        <Switch>
            <Route exact path="/home" component={UserTrial}></Route>
            <Route exact path="/home/userTrial" component={UserTrial}></Route>
            <Route path="/home/userFormal" component={UserFormal}></Route>
            <Route path="/home/project" component={Projects}></Route>
            <Route path="/home/project_create" component={CreateProject}></Route>
            <Route path="/home/project_look/:pid" component={LookProject}></Route>
            <Route path="/home/project_edit/:pid" component={EditProject}></Route>
            <Route path="/home/equipment_list" component={Equipment}></Route>
            <Route path="/home/equipment_fault" component={EquipmentFault}></Route>
            <Route path="/home/equipment_types" component={EquipmentTypes}></Route>
            <Route path="/home/message_list" component={MessageList}></Route>
            <Route path="/home/message_push" component={MessagePush}></Route>
            <Route component={PageNoFind} />
        </Switch>
    </Fragment>;
    return routes;
}