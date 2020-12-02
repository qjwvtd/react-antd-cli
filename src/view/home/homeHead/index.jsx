import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Row, Col, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { removeToken } from '@/common/utils';
import Logo from '@/view/component/logo';
import user from '@/common/store/user';

const avtar = require('@/assets/images/avtar.png');
const HomeHead = observer(() => {
    function logout() {
        removeToken();
        localStorage.clear();
        sessionStorage.clear();
    }
    function dropdownMenu() {
        return <Menu>
            <Menu.Item>
                <Link to="/updatePassword">更新密码</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/" onClick={logout}>退出登录</Link>
            </Menu.Item>
        </Menu>;
    }
    useEffect(() => {
        user.initUser();
    }, []);
    console.log(user.data);
    return <Fragment>
        <Row className="sass-ui-head" style={{ height: '44px', lineHeight: '44px', borderBottom: '1px solid #ccc' }}>
            <Col span={12} className="head-logo">
                <Logo link={'/'} />
            </Col>
            <Col span={11} className="head-status text-right">
                <div>
                    <img src={avtar} title="头像" style={{ width: '32px' }} />
                    <Dropdown overlay={dropdownMenu} placement="bottomRight">
                        <span>{user.data.name || 'zhangxiaojun'}<DownOutlined /></span>
                    </Dropdown>
                </div>
            </Col>
        </Row>
    </Fragment>;
});
export default HomeHead;

// export default class HomeHead extends PureComponent {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     dropdownMenu() {
//         return <Menu>
//             <Menu.Item>
//                 <div>项目1</div>
//                 <div>项目2</div>
//                 <div>项目3</div>
//             </Menu.Item>
//             <Menu.Item>
//                 <Link to="/updatePassword">更新密码</Link>
//             </Menu.Item>
//             <Menu.Item>
//                 <Link to="/" onClick={() => this.logout()}>退出登录</Link>
//             </Menu.Item>
//         </Menu>;
//     }
//     logout() {
//         removeToken();
//         localStorage.clear();
//         sessionStorage.clear();
//     }
//     componentDidMount() {
//         user.initUser();
//     }
//     render() {
//         return (
//             <Fragment>
//                 <Row className="sass-ui-head" style={{ height: '44px', lineHeight: '44px', borderBottom: '1px solid #ccc' }}>
//                     <Col span={12} className="head-logo">
//                         <Logo link={'/'} />
//                     </Col>
//                     <Col span={11} className="head-status text-right">
//                         <div>
//                             <img src={avtar} title="头像" style={{ width: '32px' }} />
//                             <Dropdown overlay={() => this.dropdownMenu()} placement="bottomRight">
//                                 <span>{user.data.name || 'zhangxiaojun'}<DownOutlined /></span>
//                             </Dropdown>
//                         </div>
//                     </Col>
//                 </Row>
//             </Fragment>
//         );
//     }
// }
