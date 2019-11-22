
//listener router
import createHashHistory from "history/createHashHistory";
import createBrowserHistory from "history/createBrowserHistory";

//监听路由的两种方式
//1,hash模式
const hashHistory = createHashHistory();
hashHistory.listen((location, action) => {
    //dosomething
    console.log(action, location);
});
//2,browser模式
const browserHistory = createBrowserHistory();
browserHistory.listen((location, action) => {
    //dosomething
    console.log(action, location);
});
//导出的路由模式可以使用push方法等
module.exports = browserHistory;