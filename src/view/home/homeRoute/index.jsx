import React, { Component, Fragment } from 'react';

export default class MainRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'this is main route page'
        };
    }
    render() {
        return (
            <Fragment>{this.state.title}</Fragment>
        );
    }
}