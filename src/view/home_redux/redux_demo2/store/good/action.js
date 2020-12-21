import { actions } from './index';
//计算,相当于complated功能
export const stateMap = (state) => {
    const list = state.good.list;
    return {
        list: list,
        count: (() => {
            const option = {};
            for (let i = 0; i < list.length; i++) {
                option[list[i].name] = list[i].num;
            }
            return option;
        })()
    };
};
//dispatch集合
export const dispatchMap = (dispatch) => {
    return {
        updateGoodNum: (id, value) => {
            const action = {
                type: actions.update_good_num,
                id: id,
                value: value
            };
            dispatch(action);
        }
    };
};
