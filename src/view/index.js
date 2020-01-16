import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//全局顶层模块
import PageNotFound from '@/view/404';
import Home from '@/view/home';
import Login from '@/view/login';
import UpdatePassword from '@/view/updatePassword';

export default function View() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/updatePassword" component={UpdatePassword} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
}
