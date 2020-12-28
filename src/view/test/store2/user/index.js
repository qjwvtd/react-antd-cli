//state
export const user = {
    name: '',
    nickName: '',
    role: ''
};
//reducer
export function userReducer(state = user, action) {
    switch (action.type) {
        case 'update_user_name':
            state.name = action.name;
            break;
        case 'update_user_nickName':
            state.nickName = action.nickName;
            break;
        case 'update_user_role':
            state.role = action.role;
            break;
    }
}
