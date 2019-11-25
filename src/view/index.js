import React, { PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
//router
import routerHistory from '@/common/router';
//全局顶层模块
import Main from './main';
import Home from './home';
import Login from './user/login';
import SetPassword from './user/setPassword';


export default class View extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        return (
            <Router history={routerHistory}>
                <React.Fragment>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/setPassword" component={SetPassword} />
                    <Route path="/main" component={Main} />
                </React.Fragment>
            </Router>
        );
    }
}