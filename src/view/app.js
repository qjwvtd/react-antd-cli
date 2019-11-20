import React, { PureComponent } from 'react';
import { Router, Route, Link } from 'react-router-dom';
//lisener router
import createHashHistory from "history/createHashHistory";
import createBrowserHistory from "history/createBrowserHistory";
//app
import Main from './main';
import Login from './login';
import Register from './register';

//监听路由的两种方式
//1,hash模式,路由从#开始
const hashHist = createHashHistory();
hashHist.listen((location, action) => {
    //dosomething
    console.log(action, location);
});
//2,browser模式,路由无#号
const browserHist = createBrowserHistory();
browserHist.listen((location, action) => {
    //dosomething
    console.log(action, location);
});

export default class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Router history={browserHist}>
                <React.Fragment>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Main} />
                </React.Fragment>
            </Router>
        );
    }
}