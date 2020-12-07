import React, { Component, Fragment } from 'react';

export default class Module3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is my project setting page'
        };
    }
    render() {
        return (
            <Fragment>
                {this.state.title}
                <p>这是项目设置界面</p>
                <p>使用lazy()和Suspense实现根据路由进行代码分割,'view/index.js'文件查看</p>
            </Fragment>
        );
    }
}
