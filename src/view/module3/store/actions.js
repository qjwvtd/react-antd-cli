const userActions = {
    //初始化
    initUser: (store) => {
        setTimeout(() => {
            const data = { id: 1, name: 'zhangXiaoJun', address: '成都双流' };
            store.setState(data);
        }, 1000);
    },
    //更新名称
    updateUserName: (store, name) => {
        const state = store.state;
        const newData = state.name = name;
        store.setState(newData);
    },
    //更新地址
    updateUserAddress: (store, address) => {
        const state = store.state;
        const newData = state.address = address;
        store.setState(newData);
    }
};
export default userActions;
