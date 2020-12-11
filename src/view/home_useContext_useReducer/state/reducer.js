import actions from './action';
export default function reducer(state, action) {
    switch (action.type) {
        case actions.update_name:
            state.name = action.name;
            break;
        case actions.update_date:
            state.startTime = action.start;
            state.endTime = action.end;
            break;
        case actions.update_list:
            state.list = action.list;
            break;
        default:
            throw new Error();
    }
    return Object.assign({}, state);
}
