import http from '@/common/http';
const server = require('@/common/api');

// 获取用户信息
export const getUser = data => http.GET(server.business + '/user/get/user', data);
