//initstate
const initState = {
    name: '华商金融城中心项目',
    address: '成都市高新区金融城地铁站'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case 'init_project':
            state.name = action.data.name;
            state.address = action.data.address;
            break;
        case 'update_project_address':
            state.address = action.value;
            break;
        case 'update_project_info':
            state.name = action.name;
            state.address = action.address;
            break;
    }
    return Object.assign({}, state);
};
