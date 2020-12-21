import { connect } from 'react-redux';
import { stateMap, dispatchMap } from './action';

//initState
const initState = {
    list: [
        { id: 0, name: '苹果手机', type: '电子产品', num: 20 },
        { id: 1, name: '加热奶茶', type: '饮品食物', num: 35 }
    ]
};
//actions
export const actions = {
    update_good_num: 'update_good_num'
};
//reducer
export function good(state = initState, action) {
    switch (action.type) {
        case actions.update_good_num:
            state.list.filter((item) => {
                if (item.id === action.id) {
                    item.num = action.value;
                }
            });
            break;
    }
    return Object.assign({}, state);
}
//connect other compoent
export default function connectGood(component) {
    return connect(stateMap, dispatchMap)(component);
}
