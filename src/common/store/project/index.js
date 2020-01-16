import { observable, action } from 'mobx';
import { getProjectList } from '@/common/api/project';

class Project {
    @observable list = [];
    @observable name = null;//搜索的项目名名称关键字
    @observable customer = null;//搜索的客户名称关键字
    @observable status = null; //项目状态 0启用 1禁用,默认全部
    @observable page = 1;
    @observable size = 10;
    @observable total = 0;//总条数
    //init 项目列表
    @action.bound init() {
        const sendData = {
            name: this.name,
            customer: this.customer,
            status: this.status,
            page: this.page,
            size: this.size
        };
        getProjectList(sendData).then((res) => {
            if (res.code === 200) {
                this.list = res.data.list;
                this.total = res.data.totalCount;
            }
        });
    }
    //设置搜索参数,name
    @action.bound setProjectName(name) {
        this.name = name;
    }
    //设置搜索参数,customer
    @action.bound setCustomerName(name) {
        this.customer = name;
    }
    //设置搜索参数,status
    @action.bound setProjectStatus(status) {
        this.status = status;
    }
    //设置page和size
    @action.bound setProjectPagination(page, size) {
        this.page = page;
        this.size = size;
    }
}
const project = new Project();
export default project;