// 设备类型
import { observable, action } from 'mobx';
import { getDeviceTypePage } from '@/common/api/device';

class DeviceType {
    @observable data = {
        deviceTypeLists: [], // 设备管理-设备类型数据
        deviceTypeTotalCount: 0
    }
    @observable page = 1;
    @observable size = 10;

    // 设置分页
    @action.bound setPageSize(page, size) {
        this.page = page;
        this.size = size;
        this.initDeviceTypePage();
    }
    // 分页查询设备类型列表
    @action.bound initDeviceTypePage() {
        let params = {
            page: this.page,
            size: this.size
        };
        getDeviceTypePage(params).then((res) => {
            if (res.code === 200) {
                this.data.deviceTypeLists = res.data.list;
                this.data.deviceTypeTotalCount = res.data.totalCount;
            }
        });
    }
}
let deviceType = new DeviceType();
export default deviceType;