import { getToken } from '@/common/utils';
import { message } from 'antd';
const history = require('history');

const CreateHashHistoryModel = history.createHashHistory;

//路由白名单,不需要token
const whiteRosterList = [
    '/', '/login', '/qrcodeLogin', '/setPwdCheckMobile', '/setPwd', '/wxlogin'
];

//1,hash模式
const hashRouter = new CreateHashHistoryModel();
hashRouter.listen((location, action) => {
    //dosomething
    console.log(action, location);
    //拦截
    if (whiteRosterList.indexOf(location.pathname) === -1 && !getToken()) {
        message.error('请先登录!');
        hashRouter.push('/login');
        return false;
    }
});
//2,browser模式,需要server端支持
// const browserHistory = createBrowserHistory();
// browserHistory.listen((location, action) => {
//     //dosomething
//     console.log(action, location);
// });
//导出的路由模式可以使用push方法等
module.exports = hashRouter;