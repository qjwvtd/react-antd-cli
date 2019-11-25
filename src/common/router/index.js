
//listener router,监听路由的两种方式
import { createHashHistory, createBrowserHistory } from 'history';

//1,hash模式
const hashHistory = createHashHistory();
hashHistory.listen((location, action) => {
    //dosomething
    console.log(action, location);
});
//2,browser模式,需要server端支持
const browserHistory = createBrowserHistory();
browserHistory.listen((location, action) => {
    //dosomething
    console.log(action, location);
});
//导出的路由模式可以使用push方法等
module.exports = hashHistory;