import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { ConfigProvider } from 'antd';
import store from '@/common/store';
import zhCN from 'antd/lib/locale/zh_CN';
import View from './view';
/**
 * import less
 * **/
import '@/assets/style/index.less';

function App() {
    //antd国际化,默认中文
    return <ConfigProvider locale={zhCN} componentSize={'middle'}>
        <View />
    </ConfigProvider>;
}
ReactDOM.render(
    //store全局注入
    <Provider {...store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
