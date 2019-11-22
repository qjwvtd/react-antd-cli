import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Head from '@/view/components/head';


export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() { }
    render() {
        return (
            <React.Fragment>
                <Head />
                <Row className="dhsass-body-container">
                    this is body
                </Row>
            </React.Fragment>
        );
    }
}