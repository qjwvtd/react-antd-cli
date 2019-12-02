/*二维码登录*/
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import MainFoot from '@/view/component/foot';
import Logo from '@/view/component/logo';

//code img
const qrCodeImg = require('@/static/images/codeImage.png');

class QrcodeLogin extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="login-wrap" >
                <div className="login-container">
                    <div className="text-center">
                        <Logo link="/" type={0} />
                    </div>
                    <div className="login-main">
                        <div className="logo-type-title">
                            <h4><b>手机号登录</b></h4>
                        </div>
                        <div className="qrcodeContainer">
                            <img src={qrCodeImg} />
                        </div>
                        <div className="login-type-mobile text-center" style={{ paddingTop: '20px' }}>
                            <Link to="/login"><Icon type="mobile" />手机号登录</Link>
                        </div>
                    </div>
                </div>
                <MainFoot />
            </div>
        );
    }
}
export default QrcodeLogin;