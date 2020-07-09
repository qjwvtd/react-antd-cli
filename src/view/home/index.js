import React, { Component, Fragment } from 'react';
//主界面Link,router
import HomeLink from './homeLink';
import HomeHead from './homeHead';

export default class HomeWapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false, //左侧导航是否折叠
            currentTitle: '成员管理' //当前正在操作的模块名,默认成员管理
        };
    }
    //切换折叠
    toggleCollapsed() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    //路由点击事件
    homeLinkClick(title) {
        this.setState({
            currentTitle: title
        });
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <div className="sass-ui-container">
                    <HomeHead />
                    <div className="sass-ui-content" style={{ overflow: 'hidden', width: '100%' }}>
                        <div className={this.state.collapsed ? "sass-ui-left active" : "sass-ui-left"} style={{ float: 'left', width: '200px' }}>
                            <HomeLink
                                collapsed={this.state.collapsed}
                                collapsedEvent={() => this.toggleCollapsed()}
                                linkClickEvent={(t) => this.homeLinkClick(t)}
                            />
                        </div>
                        <div className={this.state.collapsed ? "sass-ui-right" : "sass-ui-right active"} style={{ float: 'right', textAlign: 'center', width: 'calc(100% - 200px)' }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}