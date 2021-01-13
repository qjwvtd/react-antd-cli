//initstate
const initState = { id: 0, name: '苹果手机', type: '电子产品', num: 20 };
//reducer
export default (state = initState, action) => {
    switch (action.type) {
        case 'update_good_num':
            state.num = action.value;
            break;
    }
    return Object.assign({}, state);
};
