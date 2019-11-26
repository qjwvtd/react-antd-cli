import React, { PureComponent, Fragment } from 'react';

export default class WorkScope extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is my work scope page'
        };
    }
    render() {
        return (
            <Fragment>
                {this.state.title}
                <p>这是作业面信息界面</p>
            </Fragment>
        );
    }
}