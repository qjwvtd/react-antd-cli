/**
 * 5.0以后版本创建路由的4种方式,
 * [createBrowserHistory,createHashHistory,createMemoryHistory,createTransitionManager]
 */
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
history.listen((location, action) => {
    //dosomething
    console.log(action, location);
    //拦截
    // if (whiteRosterList.indexOf(location.pathname) === -1 && !getToken()) {
    //     message.error('请先登录!');
    //     history.push('/login');
    //     return false;
    // }
});
//导出的路由模式可以使用push方法等
export default history;