import { observable, action } from 'mobx';
import { removeToken } from '@/common/utils';
import router from '@/common/router';
import { getUser } from '@/common/api/user';
class User {
    @observable data = {};
    //初始化
    @action.bound init() {
        getUser(null).then((result) => {
            if (result && result.code === 200) {
                this.data = result.data;
            }
        });
    }
    //退出函数
    @action.bound logout() {
        localStorage.clear();
        sessionStorage.clear();
        removeToken();
        router.push('/login');
    }
}
const user = new User();
export default user;