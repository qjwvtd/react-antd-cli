import createStore from './../lib';
const girl = {};
function girlReducer(state, action) {
    switch (action.type) {
        case 'update_girl_data':
            state.info = action.data;
            break;
        default:
            state = { info: {} };
            break;
    }
}
const store = createStore({ girl, girlReducer });
export const useGirlStore = store.useStore;
export const GirlProvider = store.Provider;
export const girlApplyStore = store.applyStore;
