//initstate
const initState = {
    name: '华商金融城中心项目',
    address: '成都市高新区金融城地铁站'
};
//actions
const actions = {
    update_project_info: 'update_project_info',
    update_project_address: 'update_project_address'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_project_address:
            state.address = action.value;
            break;
        case actions.update_project_info:
            state.name = action.name;
            state.address = action.address;
            break;
    }
    return Object.assign({}, state);
};
