import { userReducer, userActions } from './user';
import { projectReducer, projectActions } from './project';
//注册reducer,绑定action
const options = [
    { reducer: userReducer, action: userActions },
    { reducer: projectReducer, action: projectActions }
];
//export reducer
export default function reducer(state, action) {
    try {
        const current = options.filter((item) => {
            const active = Object.keys(item.action).filter(
                act => item.action[act] === action.type
            )[0];
            return item.action[active];
        })[0];
        current && current.reducer(state, action);
        if (!current) {
            console.error('no existent of reducer or action');
        }
    } catch (e) {
        console.error(e.name + " :" + e.message);
    }
    return Object.assign({}, state);
}
