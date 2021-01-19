import { getGirlDataApi } from '@/common/api/public';
import { getProject } from '@/common/api/project';
export function initGirl() {
    return function (dispatch) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                const action = { type: 'init_girl', data: res.data };
                dispatch(action);
            }
        });
    };
}
export function initProject() {
    return function (dispatch) {
        getProject().then((result) => {
            const action = { type: 'init_project', data: result };
            dispatch(action);
        });
    };
}
export function initUser() {
    return function (dispatch) {
        const action = { type: 'init_user', data: { name: '龙门砍哥', role: '超级管理员' } };
        dispatch(action);
    };
}
export function updateProjectAddress(params) {
    return function (dispatch) {
        const action = { type: 'update_project_address', address: params };
        dispatch(action);
    };
}
