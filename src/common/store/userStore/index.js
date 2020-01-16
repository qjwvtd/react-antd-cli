// 用户管理
import { observable, action } from 'mobx';
import { getProbationCustomer, getCustomerList, getCustomerInfo } from '@/common/api/customer';

class UserStore {
    @observable data = {
        userTrialData: [], // 试用用户数据
        userTrialTotalCount: 0, // 试用用户数据总数
        probationId: null, // 试用id
        userTrialUserId: null, // 用户id
        userTrialPhone: null, // 试用用户手机号

        userFormalData: [], // 正式用户数据
        userFormalTotalCount: 0, // 正式用户数据总数
        userFormalInfoData: [] // 正式用户详情数据
    }
    // 获取试用用户列表数据
    @action.bound initUserTrialList(keyword, page, size){
        let params = {
            keyword: keyword,
            page: page,
            size: size
        };
        getProbationCustomer(params).then((res) => {
            if(res.code === 200){
                this.data.userTrialData = res.data.list || [];
                this.data.userTrialTotalCount = res.data.totalCount;
            }
        });
    }
    // 获取正式用户列表数据
    @action.bound initUserFormalList(company, principal, phone, status, page, size){
        let params = {
            company: company,
            principal: principal,
            phone: phone,
            status: status,
            page: page,
            size: size
        };
        getCustomerList(params).then((res) => {
            if(res.code === 200){
                this.data.userFormalData = res.data.list || [];
                this.data.userFormalTotalCount = res.data.totalCount;
            }
        });
    }
    // 获取正式用户详情
    @action.bound initUserFormalinfo(id){
        // 获取用户详情
        getCustomerInfo({id: id}).then((res) => {
            if(res.code === 200){
                this.data.userFormalInfoData = res.data || {};
            }
        });
    }
}
let userStore = new UserStore();
export default userStore;