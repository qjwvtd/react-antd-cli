import React, { PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
//router
import routerHistory from '@/common/router';
//全局顶层模块
import Home from './home';
import Main from './main';
import Register from './user/register';
import Login from './user/login';
import SetPassword from './user/setPassword';


export default class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    componentDidMount() { }
    render() {
        return (
            <Router history={routerHistory}>
                <React.Fragment>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/setPassword" component={SetPassword} />
                    <Route exact path="/" component={Home} />
                    <Route path="/main" component={Main} />
                </React.Fragment>
            </Router>
        );
    }
}