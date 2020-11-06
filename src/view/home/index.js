import React, { useEffect, useState, Fragment } from 'react';
//主界面Link,router
import HomeLink from './homeLink';
import HomeHead from './homeHead';

export default function HomeWapper({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [currentTitle, setCurrentTitle] = useState('成员管理');
    //切换折叠
    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }
    //路由点击事件
    function homeLinkClick(title) {
        setCurrentTitle(title);
    }
    useEffect(() => {
        console.log(currentTitle);
    }, [currentTitle]);
    return <Fragment>
        <div className="sass-ui-container">
            <HomeHead />
            <div className="sass-ui-content" style={{ overflow: 'hidden', width: '100%' }}>
                <div className={collapsed ? "sass-ui-left active" : "sass-ui-left"} style={{ float: 'left', width: '200px' }}>
                    <HomeLink
                        collapsed={collapsed}
                        collapsedEvent={() => toggleCollapsed()}
                        linkClickEvent={(t) => homeLinkClick(t)}
                    />
                </div>
                <div className={collapsed ? "sass-ui-right" : "sass-ui-right active"} style={{ float: 'right', textAlign: 'center', width: 'calc(100% - 200px)' }}>
                    {children}
                </div>
            </div>
        </div>
    </Fragment>;
}
