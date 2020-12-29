import React, { Fragment, Suspense, lazy } from 'react';
// import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import router from '@/common/router';
import { LoadingSpin } from '@/view/component';

//全局顶层模块
const PageNoFind = lazy(() => import('@/view/exception/404'));
const Error = lazy(() => import('@/view/exception/error'));
const Main = lazy(() => import('@/view/main'));
const HomeWapper = lazy(() => import('@/view/home'));
const Login = lazy(() => import('@/view/login'));
const UpdatePassword = lazy(() => import('@/view/updatePassword'));
const Test = lazy(() => import('@/view/test'));
//home
const ArrayToLinkList = lazy(() => import('@/view/home_arrayToLinkList'));
const MobxDemo = lazy(() => import('@/view/home_mobx'));
const UseGlobalHookDemo = lazy(() => import('@/view/home_use-global-hook'));
const HookStateDemo = lazy(() => import('@/view/home_hook_state'));
const CustomHook = lazy(() => import('@/view/home_customHook'));
const RecoilDemo = lazy(() => import('@/view/home_recoil'));
const ReduxDemo = lazy(() => import('@/view/home_redux'));
const ConstateDemo = lazy(() => import('@/view/home_constate'));

export default function View() {

    return <Fragment>
        <Router history={router}>
            <Suspense fallback={<LoadingSpin />}>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route path="/home/*">
                        <HomeWapper>
                            <Switch>
                                {/* 首页默认加载成员管理 */}
                                <Route exact path="/home/arrayToLinkList" component={ArrayToLinkList}></Route>
                                <Route path="/home/mobxDemo" component={MobxDemo}></Route>
                                <Route path="/home/useGlobalHookDemo" component={UseGlobalHookDemo}></Route>
                                <Route path="/home/hookStateDemo" component={HookStateDemo}></Route>
                                <Route path="/home/customHook" component={CustomHook}></Route>
                                <Route path="/home/recoilDemo" component={RecoilDemo}></Route>
                                <Route path="/home/reduxDemo" component={ReduxDemo}></Route>
                                <Route path="/home/constateDemo" component={ConstateDemo}></Route>
                                <Route component={PageNoFind} />
                            </Switch>
                        </HomeWapper>
                    </Route>
                    <Route path="/login" component={Login} />
                    <Route path="/updatePassword" component={UpdatePassword} />
                    <Route path="/test" component={Test} />
                    <Route path="/error" component={Error} />
                    <Route component={PageNoFind} />
                </Switch>
            </Suspense>
        </Router>
    </Fragment >;
}
