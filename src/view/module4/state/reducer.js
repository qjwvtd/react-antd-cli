/* eslint-disable indent */
export default function reducer(state, action) {
    switch (action.type) {
        case 'updateName':
            state.name = action.name;
            return Object.assign({}, state);
        case 'updateDate':
            state.startTime = action.start;
            state.endTime = action.end;
            return Object.assign({}, state);
        case 'updateList':
            state.list = action.list;
            return Object.assign({}, state);
        default:
            throw new Error();
    }
}