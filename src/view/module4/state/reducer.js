/* eslint-disable indent */
export default function reducer(state, action) {
    switch (action.type) {
        case 'updateName':
            state.name = action.name;
            break;
        case 'updateDate':
            state.startTime = action.start;
            state.endTime = action.end;
            break;
        case 'updateList':
            state.list = action.list;
            break;
        default:
            throw new Error();
    }
    return Object.assign({}, state);
}
