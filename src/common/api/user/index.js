import http from '@/common/http';
const server = require('@/common/api');

// 获取用户信息
export const getUser = data => http.GET(server.business + '/user/get/user', data);
// 修改密码
export const updatepwd = data => http.PUT(server.account + '/user/upw', data);
// 获取当前用户信息
export const getUserInfo = data => http.GET(server.account + '/user/info', data);