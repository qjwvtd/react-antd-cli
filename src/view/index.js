import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//全局顶层模块
import PageNotFound from '@/view/404';
import Main from '@/view/main';
import Home from '@/view/home';
import Login from '@/view/login';
import UpdatePassword from '@/view/updatePassword';
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
                    <Home />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}
