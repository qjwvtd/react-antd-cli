// 设备管理
import { observable, action } from 'mobx';
import { getDeviceTypes, getDeviceAllPage, getDeviceModuleInfo, getDeviceStatistics } from '@/common/api/device';

class Device {
    @observable data = {
        deviceTypeLists: [], // 设备类型无分页
        deviceAllLists: [], // 设备管理-设备列表数据
        deviceAllTotalCount: 0, // 设备管理-设备列表数据
        deviceStatistics: [], //获取设备统计数量
        deviceSum: 0, //当前设备库存总数
        deviceAllInfo:{} // 设备详情
    }

    @observable page = 1;
    @observable size = 10;

    // 设置分页
    @action.bound setPageSize(page, size) {
        this.page = page;
        this.size = size;
    }
    // 分页查询设备类型select列表
    @action.bound initDeviceTypeList() {
        getDeviceTypes().then((res) => {
            if (res.code === 200) {
                this.data.deviceTypeLists = res.data || [];
            }
        });
    }
    // 分页查询设备列表
    @action.bound initDeviceAllList(typeId, alloted, deviceId) {
        let params = {
            alloted: alloted,
            typeId: typeId,
            deviceId: deviceId,
            page: this.page,
            size: this.size
        };
        getDeviceAllPage(params).then((res) => {
            if (res.code === 200) {
                this.data.deviceAllLists = res.data.list || [];
                this.data.deviceAllTotalCount = res.data.totalCount || 0;
            }
        });
    }
    // 获取设备详情
    @action.bound initDeviceAllinfo(deviceId) {
        getDeviceModuleInfo({deviceId: deviceId}).then((res) => {
            if (res.code === 200) {
                this.data.deviceAllInfo = res.data || {};
            }
        });
    }
    // 获取设备统计数量
    @action.bound initDeviceStatistics() {
        getDeviceStatistics({alloted: null}).then((res) => {
            if (res.code === 200) {
                let sum = null;
                this.data.deviceStatistics = res.data || [];
                this.data.deviceStatistics.forEach((item) =>{
                    sum += item.count;
                });
                this.data.deviceSum = sum;
            }
        });
    }
}
let device = new Device();
export default device;