import React, { PureComponent } from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
//app
import Main from './main';
import Login from './login';

//监听路由,刷新不丢失
import createHashHistory from "history/createHashHistory";
const hashHist = createHashHistory();
hashHist.listen((location, action) => {
    //dosomething
    console.log(location);
    console.log(action);
});

export default class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Route exact path="/" component={Main} />
                    <Route path="/login" component={Login} />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}