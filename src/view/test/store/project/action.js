export default {
    initProject: (data) => {
        return function (dispatch) {
            const action = { type: 'init_project', data: data };
            dispatch(action);
        };
    },
    updateProjectDesc: (text) => {
        return dispatch => {
            const action = { type: 'update_project_desc', value: text };
            dispatch(action);
        };
    }
};
