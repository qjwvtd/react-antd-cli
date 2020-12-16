//initstate
export const goods = [
    { id: 0, name: '苹果手机', type: '电子产品', num: 20 },
    { id: 1, name: '加热奶茶', type: '饮品食物', num: 35 }
];
//actions
export const goodsActions = {
    update_good_num: 'update_good_num'
};
//reducer
export function goodReducer(state = goods, action) {
    switch (action.type) {
        case goodsActions.update_good_num:
            state.goods.filter((item) => {
                if (item.id === action.id) {
                    item.num = action.value;
                }
            });
            break;
    }
}
