import http from '@/common/http';
// 获取项目信息
export const getProject = () => http.GET('http://localhost:3000/api/project');
