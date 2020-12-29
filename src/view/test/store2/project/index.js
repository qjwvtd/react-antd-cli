const initState = {
    name: '金融城项目',
    desc: '关于金融城项目的描述'
};
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_project':
            state.name = action.data.name;
            state.desc = action.data.desc;
            break;
    }
    return Object.assign({}, state);
}
