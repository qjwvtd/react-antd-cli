//state
export const user = {
    name: '龙门砍哥',
    role: "超级管理员"
};
//actions
export const userActions = {
    init: 'init_user',
    update_user_name: 'update_user_name',
    update_user_role: 'update_user_role'
};
//reducer
export function userReducer(state, action) {
    switch (action.type) {
        case userActions.init:
            state.user = action.user;
            break;
        case userActions.update_user_name:
            state.user.name = action.name;
            break;
        case userActions.update_user_role:
            state.user.role = action.role;
            break;
        default:
            throw new Error();
    }
}
