import React, { Fragment, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Layout } from 'antd';
import MainHead from './layoutHead';
import MainMenu from './layoutLeft';
import MainRoutes from './layoutRight';

import router from '@/common/router';
import user from '@/common/store/user';

import { getToken } from '@/common/utils';

const { Header, Sider, Content } = Layout;

const Home = observer(() => {
    //拦截
    if (!getToken()) {
        router.push('/login');
        return false;
    }
    useEffect(() => {
        !user.data.id && user.init();
    }, [user.data.id]);
    const homeRenderNode = <Fragment>
        <Layout>
            <Header> <MainHead /> </Header>
            <Layout>
                <Sider>
                    <MainMenu />
                </Sider>
                <Content >
                    <div className="main-content">
                        <MainRoutes />
                    </div>
                </Content>
            </Layout>
        </Layout >
    </Fragment>;
    return homeRenderNode;
});
export default Home;