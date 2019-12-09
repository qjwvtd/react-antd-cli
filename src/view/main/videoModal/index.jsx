import React, { Component } from 'react';
import { Modal } from 'antd';

class VideoModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible:false,
            autoPlay:true
        };
    }
    hideModal(){
        this.props.hideModal(false);
    }
    render() {
        const videoPath =  require('@/static/video/videoImg.mp4');
        return(
            <Modal
                width={1000}
                zIndex={10}
                bodyStyle={{backgroundColor:'#000'}}
                wrapClassName = {'video_modal'}
                visible = {this.props.visible}
                centered = {true}
                onCancel = {() => this.hideModal()}
                footer = {
                    []
                }>
                <div className='video_box'>
                    <video width="100%" height="100%" controls autoPlay={this.state.autoPlay}>
                        <source src={videoPath} type="video/mp4" />
                    </video>
                </div>
            </Modal>
        );
    }
}
export default VideoModal;