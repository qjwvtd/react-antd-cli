import { observable, action } from 'mobx';
import { getUser } from '@/common/api/user';
class User {
    @observable data = {};
    @action initUser() {
        getUser().then((res) => {
            this.data = res.data;
        });
    }
}
const user = new User();
export default user;
