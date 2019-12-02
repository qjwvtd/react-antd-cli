import http from '@/common/http';

//生成试用用户数据
export const createProbationData = data => http.GET('api/enterprise/v1/user/create/probation/data', data);