import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Icon, Popover } from 'antd';
import Logo from "../component/logo";
import codeImage from '@/static/images/codeImage.png';
import TryoutModal from './tryoutModal/index.jsx';
import VideoModal from './videoModal/index.jsx';

export default class Main extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            VideoVisible: false
        };
    }

    // 打开试用登录弹窗
    openTryOutModal() {
        this.setState({
            visible: true
        });
    }
    // 关闭试用登录弹窗
    hideTryoutModal(value){
        this.setState({
            visible:value
        });
    }
    // 打开观看视频弹窗
    openVideoModal(){
        this.setState({
            VideoVisible: true
        });
    }
    // 关闭打开视频弹窗
    hideVideoModal(value){
        this.setState({
            VideoVisible:value
        });
    }
    render() {
        return (
            <React.Fragment >
                <div className="guide_container">
                    <Row className="head">
                        <Col span={16} offset={4} className="flex_between">
                            <Logo />
                            <div className='login_box'>
                                <Link to="/login">
                                    <Button className="login_btn" type = "primary" ghost>登录</Button>
                                </Link>
                                <Popover placement="bottomRight" content={
                                    (
                                        <div className="qrcodeInfo_box">
                                            <img src={codeImage} />
                                            <span>微信扫码登录小程序</span>
                                        </div>
                                    )
                                } trigger="hover">
                                    <span className="hoverIcon">智安汇小程序 <Icon className="icon" type="down" /></span>
                                </Popover>
                            </div>
                        </Col>
                    </Row>
                    <Row className='info'>
                        <Col span={12} offset={6}>
                            <p className='title'>智安汇是什么？</p>
                            <div className='txt'>智安汇以智能硬件为入口，以项目管控为核心，聚焦现场工程进度、安全管控、协同管理，保证业务各方高效沟通；同时采集现场人员健康数据，确保安全施工，让工程管理更高效、工人作业更安全！</div>
                        </Col>
                    </Row>
                    <Row className='btn_box'>
                        <Col span={24}>
                            <Button className='btn' type = "primary" onClick = {() => this.openTryOutModal()}>免费试用</Button>
                            <Button className='btn videoBtn' type = "primary" ghost onClick = {() => this.openVideoModal()}><Icon type="play-circle" />观看视频</Button>
                        </Col>
                    </Row>
                    {/* 免费试用登录弹窗 */}
                    <TryoutModal visible={this.state.visible} hideModal={(value)=>this.hideTryoutModal(value)}/>
                    {/* 观看视频 */}
                    <VideoModal visible={this.state.VideoVisible} hideModal={(value)=>this.hideVideoModal(value)} />
                </div>
            </React.Fragment>
        );
    }
}
