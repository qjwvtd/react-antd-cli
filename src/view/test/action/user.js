export default {
    name: null,
    role: null,
    initUser: function (setState, state) {
        state.user.name = 'zhangxiaojun';
        state.user.role = 'admin';
        setState(state);
    }
};
