//state
export const project = {
    name: '金融城项目',
    desc: '关于双江口项目的一些描述'
};
//reducer
export function projectReducer(state = project, action) {
    switch (action.type) {
        case 'update_project_name':
            state.name = action.name;
            break;
        case 'update_project_desc':
            state.desc = action.desc;
            break;
    }
}
