import { observable, action } from 'mobx';
import { getSurfaceList } from '@/common/api/surface';
import { getAllotedDeviceList } from '@/common/api/project';
//创建项目时存储在本地的信息
class CreateStore {
    @observable base = {};//基本信息
    @observable devices = [];//分配的设备列表
    @observable surface = [];//设置的作业面信息
    //设备搜索
    @observable deviceSearch = { deviceId: null, deviceTypeId: null };
    //设备列表分页
    @observable devicePagination = { page: 1, size: 5, total: 1 };
    //作业面搜索
    @observable surfaceSearch = { name: null, status: null };
    //作业面列表分页
    @observable surfacePagination = { page: 1, size: 5, total: 1 };
    //清除Base
    @action.bound clear() {
        this.base = {};
        this.devices = [];
        this.surface = [];
        this.surfacePagination = { page: 1, size: 5, total: 1 };
    }
    //设置项目ID,提交成功后调用
    @action.bound setProjectId(id) {
        this.base.id = id;
    }
    //设置项目名称
    @action.bound setProjectName(name) {
        this.base.name = name;
    }
    //设置项目所属客户
    @action.bound setCustomer(option) {
        this.base.customer = option;
    }
    //设置项目地址
    @action.bound setProjectAreaInfo(list) {
        this.base.area = list;
        this.base.region = list[0].name + list[1].name + list[2].name;
    }
    //设置项目详细地址
    @action.bound setProjectAddress(text) {
        this.base.address = text;
    }
    //设置项目介绍
    @action.bound setProjectDesc(text) {
        this.base.desc = text;
    }
    //获取项目已分配出售的设备
    @action.bound initAllotedDeviceList(pid) {
        const sendData = {
            projectId: pid,
            deviceId: this.deviceSearch.deviceId,
            deviceTypeId: this.deviceSearch.deviceTypeId,
            page: this.devicePagination.page,
            size: this.devicePagination.size
        };
        getAllotedDeviceList(sendData).then((res) => {
            console.log(res);
            if (res.code === 200) {
                this.devices = res.data.list;
                this.devicePagination.total = res.data.totalCount;
            }
        });
    }
    //设置设备列表搜索内容
    @action.bound setDeviceSearchContent(deviceId, deviceTypeId) {
        this.deviceSearch.deviceId = deviceId;
        this.deviceSearch.deviceTypeId = deviceTypeId;
    }
    //设置设备分页page,size
    @action.bound setDevicePagination(page, size) {
        this.devicePagination.page = page;
        this.devicePagination.size = size;
    }
    //设置作业面分页的page,size
    @action.bound setSurfacePagination(page, size) {
        this.surfacePagination.page = page;
        this.surfacePagination.size = size;
    }
    //获取作业面列表分页信息,创建作业面时调用
    @action.bound initSurfaceList(option) {
        const sendData = {
            projectId: this.base.id,
            name: option.name,
            status: option.status,
            page: this.surfacePagination.page,
            size: this.surfacePagination.size
        };
        getSurfaceList(sendData).then((res) => {
            // console.log(res);
            if (res.code === 200) {
                this.surface = res.data.list;
                this.surfacePagination.total = res.data.totalCount;
            }
        });
    }
}
const createStore = new CreateStore();
export default createStore;