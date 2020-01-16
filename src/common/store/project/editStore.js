//当前正在编辑的项目
import { observable, action } from 'mobx';
import { getProjectBaseInfo, getAllotedDeviceList, getProjectSurfaceList } from '@/common/api/project';
//当前正在编辑项目时存储在本地的信息
class EditStore {
    @observable base = {};//基本信息
    @observable devices = [];//分配的设备列表
    @observable surface = [];//设置的作业面列表
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
    }
    //获取项目基本信息
    @action.bound initBaseInfo(pid) {
        getProjectBaseInfo(pid).then((res) => {
            if (res.code === 200) {
                this.base = res.data;
                this.devicePagination.total = res.data.totalCount;
            }
        });
    }
    //获取项目已分配设备列表
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
    //获取项目的作业面列表
    @action.bound initSurfaceList(pid) {
        const sendData = {
            projectId: pid,
            name: this.surfaceSearch.name,
            status: this.surfaceSearch.status,
            page: this.surfacePagination.page,
            size: this.surfacePagination.size
        };
        getProjectSurfaceList(sendData).then((res) => {
            if (res.code === 200) {
                this.surface = res.data.list;
                this.surfacePagination.total = res.data.totalCount;
            }
        });
    }
    //设置作业面列表搜索内容
    @action.bound setSurfaceSearchContent(name, status) {
        this.surfaceSearch.name = name;
        this.surfaceSearch.status = status;
    }
    //设置作业面分页
    @action.bound setSurfacePagination(page, size) {
        this.surfacePagination.page = page;
        this.surfacePagination.size = size;
    }
    //更新项目名称
    @action.bound updateBaseProjectName(name) {
        this.base.name = name;
    }
    //更新项目省市区地址
    @action.bound updateRegionInfo(list) {
        this.base.provinceCode = list[0].areaCode;
        this.base.cityCode = list[1].areaCode;
        this.base.countyCode = list[2].areaCode;
        this.base.addr = list[0].name + list[1].name + list[2].name + this.base.streetNumber;
        this.base.longitude = list[2].lng;
        this.base.latitude = list[2].lat;
    }
    //更新项目详细地址
    @action.bound updateStreetInfo(text) {
        this.base.streetNumber = text;
    }
    //设置基本信息里的所属客户
    @action.bound updateBaseCustomer(option) {
        this.base.customerId = option.id;
        this.base.customerName = option.company;
        this.base.userId = option.userId;
    }
    //更新项目介绍
    @action.bound updateBaseDesc(text) {
        this.base.introduce = text;
    }
}
const editStore = new EditStore();
export default editStore;