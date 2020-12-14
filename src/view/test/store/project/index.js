//state
export const project = {
    name: '双江口项目',
    desc: '关于双江口项目的一些描述'
};
//actions
export const actions = {
    update_project_name: 'update_project_name',
    update_project_desc: 'update_project_desc'
};
//reducer
export function projectReducer(state, action) {
    if (actions[action.type]) {
        switch (action.type) {
            case actions.update_project_name:
                state.project.name = action.name;
                break;
            case actions.update_project_desc:
                state.project.desc = action.desc;
                break;
            default:
                throw new Error();
        }
    }
}
