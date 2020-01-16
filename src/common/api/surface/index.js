import http from '@/common/http';
const server = require('@/common/api');

//添加作业面
export const addSurface = data => http.POST(server.business + '/surface/add', data);
//修改作业面
export const putSurface = data => http.PUT(server.business + '/surface/put', data);
//获取作业面列表分页信息
export const getSurfaceList = data => http.GET(server.business + '/surface/page', data);
//作业面的启用和禁用
export const switchSurfaceStatus = data => http.PUT(server.business + '/surface/change/status', data);
//获取作业面详情
export const getSurfaceDetail = id => http.GET(server.business + '/surface/info/' + id);
//上传电子围栏和基站位置文件,type=1是围栏,type=2是基站
export const uploadPointsFileUrl = type => server.business + '/surface/analyse/txt/' + type;