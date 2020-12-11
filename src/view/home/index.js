import React, { useEffect, useState, Fragment } from 'react';
//主界面Link,router
import HomeLink from './homeLink';
import HomeHead from './homeHead';

export default function HomeWapper({ children }) {
    const [currentTitle, setCurrentTitle] = useState('成员管理');
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
                <div className="sass-ui-left" style={{ float: 'left', width: '300px' }}>
                    <HomeLink
                        linkClickEvent={(t) => homeLinkClick(t)}
                    />
                </div>
                <div className="sass-ui-right" style={{ float: 'right', width: 'calc(100% - 300px)' }}>
                    {children}
                </div>
            </div>
        </div>
    </Fragment>;
}
