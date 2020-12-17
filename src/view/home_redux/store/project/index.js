//initstate
const initState = {
    name: '大渡河双江口水电站项目',
    address: '阿坝藏族自治区马尔康市'
};
//actions
const actions = {
    update_project_address: 'update_project_address'
};
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case actions.update_project_address:
            state.address = action.value;
            break;
    }
    return Object.assign({}, state);
};
