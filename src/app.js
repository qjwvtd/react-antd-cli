import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import View from './view';
/**
 * import css
 * **/
import './static/style/index.less';

//国际化,默认中文
function App(props) {
    const { } = props;
    return (
        <ConfigProvider locale={zhCN}>
            <View />
        </ConfigProvider>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
