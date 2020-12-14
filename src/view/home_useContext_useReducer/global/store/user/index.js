//state
export const user = {
    name: '龙门砍哥',
    role: "超级管理员"
};
//actions
export const actions = {
    update_user_name: 'update_user_name',
    update_user_role: 'update_user_role'
};
//reducer
export function userReducer(state, action) {
    if (actions[action.type]) {
        switch (action.type) {
            case actions.update_user_name:
                state.user.name = action.name;
                break;
            case actions.update_user_role:
                state.user.role = action.role;
                break;
            default:
                throw new Error();
        }
    }
}
