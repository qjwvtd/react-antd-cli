// 设备故障管理
import { observable, action } from 'mobx';
import { getDeviceTypes, getDeviceFaultPage, getDeviceFaultInfo, getDeviceFaultStatistics } from '@/common/api/device';

class Fault {
    @observable data = {
        deviceTypeLists: [], // 设备类型select列表
        deviceFaultLists: [], // 设备故障列表
        deviceFaultTotalCount: 0, // 设备故障列表总数
        deviceFaultInfo: {}, // 设备故障列表总数
        deviceFaultStatistics: [], // 获取故障设备统计数量
        deviceFaultSum: 0 // 当前故障设备总数
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
    // 分页查询设备故障列表
    @action.bound initDeviceFaultList(typeId, alloted, deviceId) {
        let params = {
            alloted: alloted,
            typeId: typeId,
            deviceId: deviceId,
            page: this.page,
            size: this.size
        };
        getDeviceFaultPage(params).then((res) => {
            if (res.code === 200) {
                this.data.deviceFaultLists = res.data.list || [];
                this.data.deviceFaultTotalCount = res.data.totalCount || 0;
            }
        });
    }
    // 获取设备故障详情
    @action.bound initDeviceFaultinfo(deviceId) {
        getDeviceFaultInfo({deviceId: deviceId}).then((res) => {
            if (res.code === 200) {
                this.data.deviceFaultInfo = res.data || {};
            }
        });
    }
    // 获取设备故障统计数量
    @action.bound initDeviceFaultStatistics() {
        getDeviceFaultStatistics({alloted: null}).then((res) => {
            if (res.code === 200) {
                let sum = null;
                this.data.deviceFaultStatistics = res.data || [];
                this.data.deviceFaultStatistics.forEach((item) =>{
                    sum += item.count;
                });
                this.data.deviceFaultSum = sum;
            }
        });
    }
}
let fault = new Fault();
export default fault;