//initstate
export const project = {
    name: '大渡河双江口水电站项目',
    address: '阿坝藏族自治区马尔康市'
};
//actions
export const projectActions = {
    update_project_address: 'update_project_address'
};
//reducer
export function projectReducer(state = project, action) {
    switch (action.type) {
        case projectActions.update_project_address:
            state.project.address = action.value;
            break;
    }
}
