const initState = {
    author: 'author',
    desc: 'the some description',
    url: null
};
export default function (state = initState, action) {
    switch (action.type) {
        case 'init_girl':
            state.author = action.data.author;
            state.desc = action.data.desc;
            state.url = action.data.url;
            break;
    }
    return Object.assign({}, state);
}
