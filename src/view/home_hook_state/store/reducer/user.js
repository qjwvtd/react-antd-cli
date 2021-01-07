const initState = {
    name: 'dsfadsfadsa',
    role: 'dsfadsa',
    len: 100,
    index: 5
};
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_user':
            state.name = action.data.name;
            state.role = action.data.role;
            break;
        case 'update_xh':
            state.index = action.value;
    }
    return Object.assign({}, state);
}
