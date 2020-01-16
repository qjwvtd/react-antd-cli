import http from '@/common/http';
const server = require('@/common/api');

// 获取设备类型
export const getDeviceTypes = data => http.GET(server.devices + '/device/types', data);
// 获取设备列表
export const getDeviceAllPage = data => http.GET(server.devices + '/device/page/all', data);
// 获取设备报障列表
export const getDeviceFaultPage = data => http.GET(server.devices + '/device/page/fault', data);
// 获取设备类型分页
export const getDeviceTypePage = data => http.GET(server.devices + '/device/page/type', data);
// 获取设备分配统计数量,alloted:[0|1],0 未分配 1已分配
export const getDeviceStatistics = data => http.GET(server.devices + '/device/get/statistics', data);
//获取故障设备统计数量
export const getDeviceFaultStatistics = data => http.GET(server.devices + '/device/get/fault/statistics', data);
// 查看设备故障信息
export const getDeviceFaultInfo = data => http.GET(server.business + '/devices/get/fault/' + data.deviceId);
// 查看设备模块信息
export const getDeviceModuleInfo = data => http.GET(server.business + '/devices/get/module/' + data.deviceId);
//分配设备后出售接口,创建,修改项目时调用
export const addProjectDeviceList = data => http.POST(server.oms + '/device/demand/add', data);