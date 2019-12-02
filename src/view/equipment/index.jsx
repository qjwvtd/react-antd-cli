import React, { Component, Fragment } from 'react';

export default class Equipment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is my Equipment page'
        };
    }
    render() {
        return (
            <Fragment>
                {this.state.title}
                <p>这是设备管理界面</p>
            </Fragment>
        );
    }
}