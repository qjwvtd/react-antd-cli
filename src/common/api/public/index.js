import http from '@/common/http';

//获取上一次进入系统时的项目(登录成功后立即调用)
export const getLastTimeProject = data => http.GET('api/enterprise/v1/project/get/enter/last', data);
