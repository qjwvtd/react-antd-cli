import { observable } from 'mobx';

const store = {
    data: {},
    initUser() {
        setTimeout(() => {
            const mockData = {
                id: 197,
                name: "张小军",
                phone: "18828055416",
                sex: 1,
                portrait: "https://oss.dhwork.cn/dev/images/portrait/56ad9d1bfc63464923e5c021b5e1f6be.png",
                hasPassword: true,
                roleId: 208,
                projectId: 103,
                roleName: "超级管理员",
                departmentId: 741
            };
            this.data = mockData;
        }, 1000);
    },
    updateUserName(name) {
        this.data.name = name;
    }
};
const userStore = observable(store);
export default userStore;

