//initState
const initState = {
    name: '金融城项目',
    address: '关于金融城项目的描述'
};
//reducer
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_project':
            state.name = action.data.name;
            state.address = action.data.address;
            break;
        case 'update_project_address':
            state.address = action.value;
            break;
    }
    return Object.assign({}, state);
}
