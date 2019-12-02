// 进度条
import React, { Component } from 'react';
import { Progress } from 'antd';
import Footer from '@/view/component/foot';

class ProgressPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            percent:0
        };
    }
    componentDidMount(){
        this.timer = setInterval(()=>{
            const {percent} = this.state;
            if(percent < 99){
                this.setState({
                    percent:percent+1
                });
            }else{
                clearInterval(this.timer);
            }
        }, 50);
    }
    render() {
        return(
            <div className='progress_box'>
                <Progress
                    type="circle" width={140}
                    strokeWidth={8}
                    percent={this.state.percent} />
                <p className='progressTxt'>数据正在初始化，请稍后...</p>
                <Footer />
            </div>
        );
    }
}

export default ProgressPage;