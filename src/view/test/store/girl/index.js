//initState
const initState = {
    list: []
};
//reducer
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_girl':
            state.list = action.data;
            break;
    }
    return Object.assign({}, state);
}
