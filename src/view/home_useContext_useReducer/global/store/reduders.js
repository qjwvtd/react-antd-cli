import { userReducer, userActions } from './user';
import { projectReducer, projectActions } from './project';
//注册reducer
const options = [
    { reducer: userReducer, action: userActions },
    { reducer: projectReducer, action: projectActions }
];
//export reducers
export default function reducers(state, action) {
    try {
        const current = options.filter(item => item.action[action.type])[0];
        if (!current) {
            throw 'no existent of reducer or action';
        }
        current && current.reducer(state, action);
    } catch (e) {
        console.log(e.name + " :" + e.message);
    }
    return Object.assign({}, state);
}
