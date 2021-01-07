//initState
const initState = {
    name: '金融城项目',
    desc: '关于金融城项目的描述'
};
//reducer
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_project':
            state.name = action.data.name;
            state.desc = action.data.desc;
            break;
        case 'update_project_desc':
            state.desc = action.value;
            break;
    }
    return JSON.parse(JSON.stringify(state));
}
