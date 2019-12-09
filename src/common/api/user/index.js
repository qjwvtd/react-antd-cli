import http from '@/common/http';

// 获取用户信息 包括用户信息，部门信息，管理项目信息
export const getUser = data => http.GET('api/enterprise/v1/user/get/user', data);