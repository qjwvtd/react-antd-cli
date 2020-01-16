// import { getToken } from '@/common/utils';
// import { message } from 'antd';
const history = require('history');
//5.0以后版本创建路由的4种方式
// const CreateRouterHistory = history.createBrowserHistory;
const CreateRouterHistory = history.createHashHistory;
// const CreateRouterHistory = history.createMemoryHistory;
// const CreateRouterHistory = history.createTransitionManager;

//路由白名单,不需要token
// const whiteRosterList = [
//     '/', '/login', '/qrcodeLogin', '/setPwdCheckMobile', '/setPwd', '/wxlogin'
// ];

const routerHistory = new CreateRouterHistory();
routerHistory.listen((location, action) => {
    //dosomething
    console.log(action, location);
    //拦截
    // if (whiteRosterList.indexOf(location.pathname) === -1 && !getToken()) {
    //     message.error('请先登录!');
    //     routerHistory.push('/login');
    //     return false;
    // }
});
//导出的路由模式可以使用push方法等
module.exports = routerHistory;