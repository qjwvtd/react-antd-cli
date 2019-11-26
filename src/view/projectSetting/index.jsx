import React, { Component, Fragment } from 'react';

export default class ProjectSetting extends Component {
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
            </Fragment>
        );
    }
}