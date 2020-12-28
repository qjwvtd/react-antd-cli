import createHookStore from './lib';
import { user, userReducer } from './user';
import { project, projectReducer } from './project';
//合并成一个reducer
const connectReducer = [
    { user, userReducer },
    { project, projectReducer }
];
// const reducers = {userReducer}[
//     { user, userReducer },
//     { project, projectReducer }
// ];
//使用
const { HookStore, Provider, AsyncStore } = createHookStore(connectReducer);
//别名
export const useGloblaStore = HookStore;
export const GloblaProvider = Provider;
export const globlaAsyncStore = AsyncStore;
