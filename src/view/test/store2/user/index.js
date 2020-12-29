const initState = {
    name: '',
    role: ''
};
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_user':
            state.name = action.data.name;
            state.role = action.data.role;
            break;
    }
    return Object.assign({}, state);
}
