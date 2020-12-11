import React, { Fragment, Suspense, lazy } from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import router from '@/common/router';
import { Spin } from 'antd';
//全局顶层模块
const PageNoFind = lazy(() => import('@/view/exception/404'));
// import { PageNoFind } from '@/view/exception/404';
const Error = lazy(() => import('@/view/exception/error'));
// import { Error } from '@/view/exception/error';
// import Main from '@/view/main';
const Main = lazy(() => import('@/view/main'));
// import HomeWapper from '@/view/home';
const HomeWapper = lazy(() => import('@/view/home'));
// import Login from '@/view/login';
const Login = lazy(() => import('@/view/login'));
// import UpdatePassword from '@/view/updatePassword';
const UpdatePassword = lazy(() => import('@/view/updatePassword'));

//1
const ArrayToLinkList = lazy(() => import('@/view/home_arrayToLinkList'));
//2
const MobxDemo = lazy(() => import('@/view/home_mobx'));
//3
const UseGlobalHookDemo = lazy(() => import('@/view/home_use-global-hook'));
//4
const ContextAndReducerDemo = lazy(() => import('@/view/home_useContext_useReducer'));
//5
const CustomHook = lazy(() => import('@/view/home_customHook'));
//6
const RecoilDemo = lazy(() => import('@/view/home_recoil'));


export default function View() {
    function LoadingSpin() {
        return <div className="text-center" style={{ height: '480px', lineHeight: '480px' }}>
            <Spin />
        </div>;
    }
    return <Fragment>
        <Router history={router}>
            <Suspense fallback={<LoadingSpin />}>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <HomeWapper>
                        <Switch>
                            {/* 首页默认加载成员管理 */}
                            <Route exact path="/home/arrayToLinkList" component={ArrayToLinkList}></Route>
                            <Route path="/home/mobxDemo" component={MobxDemo}></Route>
                            <Route path="/home/useGlobalHookDemo" component={UseGlobalHookDemo}></Route>
                            <Route path="/home/contextAndReducerDemo" component={ContextAndReducerDemo}></Route>
                            <Route path="/home/customHook" component={CustomHook}></Route>
                            <Route path="/home/recoilDemo" component={RecoilDemo}></Route>
                            <Route component={PageNoFind} />
                        </Switch>
                    </HomeWapper>
                    <Route path="/login" component={Login} />
                    <Route path="/updatePassword" component={UpdatePassword} />
                    <Route path="/error" component={Error} />
                    <Route component={PageNoFind} />
                </Switch>
            </Suspense>
        </Router>
    </Fragment >;
}
