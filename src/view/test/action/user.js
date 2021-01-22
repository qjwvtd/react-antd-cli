export default {
    data: { name: null, role: null },
    initUser: function ({ setState, state }) {
        state.user.data.name = 'zhangxiaojun';
        state.user.data.role = 'admin';
        setState(state);
    }
};
