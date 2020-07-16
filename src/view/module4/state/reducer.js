/* eslint-disable indent */
import { store } from './store';
export default function reducer(state, action) {
    switch (action.type) {
        case 'updateName':
            store.name = action.name;
            return Object.assign({}, store);
        case 'updateDate':
            store.startTime = action.start;
            store.endTime = action.end;
            return Object.assign({}, store);
        case 'updateList':
            store.list = action.list;
            return Object.assign({}, store);
        default:
            throw new Error();
    }
}