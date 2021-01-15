import { getProject } from '@/common/api/project';
export default {
    initProject: () => {
        return function (dispatch) {
            getProject().then((result) => {
                const action = { type: 'init_project', data: result };
                dispatch(action);
            });

        };
    },
    updateProjectAddress: (text) => {
        return dispatch => {
            const action = { type: 'update_project_address', value: text };
            dispatch(action);
        };
    }
};
