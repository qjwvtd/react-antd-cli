import React, { Component } from 'react';
//主界面Link,router
import MainLink from './homeLink';
import MainRoute from './homeRoute';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false //左侧导航是否折叠
        };
    }
    //切换折叠
    toggleCollapsed() {
        console.log('start collapsed');
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    componentDidMount() { }
    render() {
        return (
            <React.Fragment>
                <div className="sass-ui-container">
                    <div className={this.state.collapsed ? "sass-ui-left active" : "sass-ui-left"}>
                        <MainLink collapsed={this.state.collapsed} callback={() => this.toggleCollapsed()} />
                    </div>
                    <div className={this.state.collapsed ? "sass-ui-right" : "sass-ui-right active"}>
                        <MainRoute />
                    </div>
                </div>
            </React.Fragment >
        );
    }
}