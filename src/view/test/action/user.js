import React from 'react';
const initState = { name: null, role: null };
export default function useUser() {
    const [user, setUser] = React.useState(initState);
    const initUser = function () {
        user.name = 'zhangxiaojun';
        user.role = 'admin';
        setUser(user);
    };
    return { user, initUser };
}
