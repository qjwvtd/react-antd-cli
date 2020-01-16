import http from '@/common/http';
const server = require('@/common/api');

// 获取用户信息
export const getProbationCustomer = data => http.GET(server.business + '/customer/probation/page', data);
// 获取正式用户列表
export const getCustomerList = data => http.GET(server.oms + '/customer/page', data);
// 获取正式用户详情
export const getCustomerInfo = data => http.GET(server.oms + '/customer/info', data);
// 修改正式用户信息
export const putCustomer = data => http.PUT(server.oms + '/customer/put', data);
// 启用禁用正式用户
export const putCustomerStatus = data => http.PUT(server.oms + '/customer/put/status', data);
// 试用客户转换为正式客户
export const transCustomer = data => http.POST(server.oms + '/customer/trans', data);
