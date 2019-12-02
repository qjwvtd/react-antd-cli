import constant from '@/common/utils/constant.js';
/**
*设置当前项目ID
*@params pid,当前获取的项目ID
*/
export function setCurrentProjectId(pid) {
    sessionStorage.setItem(constant.storage.currentProjectId, JSON.stringify(pid ? pid : null));
}
//获取当前项目ID
export function getCurrentProjectId() {
    return JSON.parse(sessionStorage.getItem(constant.storage.currentProjectId));
}