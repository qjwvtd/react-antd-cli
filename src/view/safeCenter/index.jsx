import React, { Component, Fragment } from 'react';

export default class SafeCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is my safe center page'
        };
    }
    render() {
        return (
            <Fragment>
                {this.state.title}
                <p>这是安全中心界面</p>
            </Fragment>
        );
    }
}