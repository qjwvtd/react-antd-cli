//state
export const project = {
    name: '双江口项目',
    desc: '关于双江口项目的一些描述'
};
//actions
export const projectActions = {
    update_project_name: 'update_project_name',
    update_project_desc: 'update_project_desc'
};
//reducer
export function projectReducer(state, action) {
    switch (action.type) {
        case projectActions.update_project_name:
            state.project.name = action.name;
            break;
        case projectActions.update_project_desc:
            state.project.desc = action.desc;
            break;
        default:
            throw new Error();
    }
}
