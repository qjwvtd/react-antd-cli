import http from '@/common/http';
const server = require('@/common/api');

//获取上一次进入系统时的项目(登录成功后立即调用)
export const getLastTimeProject = data => http.GET(server.business + '/project/get/enter/last', data);
//获取天气
export const getWeatherData = () => http.GET(server.business + '/surface/weather');
//获取省级行政区域清单
export const getAreaList = () => http.GET(server.versatile + '/cnarea/province/list');
//获取某行政区域下辖区域清单
export const getNextAreaList = data => http.GET(server.versatile + '/cnarea/region/list', data);
//获取客户列表
export const getCustomerList = data => http.GET(server.oms + '/customer/page', data);
