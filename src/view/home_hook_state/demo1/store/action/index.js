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
