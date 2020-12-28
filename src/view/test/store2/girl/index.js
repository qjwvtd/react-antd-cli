import createHookStore from './../lib';
const girl = {};
function girlReducer(state = girl, action) {
    switch (action.type) {
        case 'init_girl':
            state.author = action.data.author;
            state.desc = action.data.desc;
            state.url = action.data.url;
            break;
    }
}
const { HookStore, Provider, AsyncStore } = createHookStore({ girl, girlReducer });
export const useGirlStore = HookStore;
export const GirlProvider = Provider;
export const girlAsyncStore = AsyncStore;
