//initState
const initState = {};
//reducer
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_girl':
            state.desc = action.data.desc;
            state.url = action.data.url;
            break;
        case 'update_girl_desc':
            state.desc = action.value;
            break;
    }
    return JSON.parse(JSON.stringify(state));
}
