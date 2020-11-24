import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import View from './view';
/**
 * import less
 * **/
import '@/assets/style/index.less';

//国际化,默认中文
function App() {
    return <ConfigProvider locale={zhCN} componentSize={'middle'}>
        <View />
    </ConfigProvider>;
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
