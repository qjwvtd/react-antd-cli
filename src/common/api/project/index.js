import http from '@/common/http';
const server = require('@/common/api');

//添加项目
export const addProject = data => http.POST(server.business + '/project/add', data);
//更新项目基本信息
export const putProjectBaseInfo = data => http.PUT(server.business + '/project/put', data);
//获取项目分页列表
export const getProjectList = data => http.GET(server.oms + '/project/page', data);
//统计项目个数
export const getProjectNumberCount = data => http.GET(server.business + '/project/count/customer', data);
//启用或禁用项目
export const switchProjectStatus = data => http.PUT(server.business + '/project/change/status', data);
//根据项目ID获取项目基本信息
export const getProjectBaseInfo = pid => http.GET(server.oms + '/project/info/' + pid);
//根据项目ID,设备ID,设备类型,page,size,获取项目已分配的设备列表
export const getAllotedDeviceList = data => http.GET(server.business + '/devices/page/alloted', data);
//根据项目ID,作业面名称,作业面状态,page,size,获取项目的作业面列表
export const getProjectSurfaceList = data => http.GET(server.business + '/surface/page', data);