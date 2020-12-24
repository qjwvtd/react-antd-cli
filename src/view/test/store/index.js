import createStore from './lib';
import { user, userReducer } from './user';
import { project, projectReducer } from './project';
//合并成一个reducer
const connectReducer = [
    { user, userReducer },
    { project, projectReducer }
];
//使用
const globlaStore = createStore(connectReducer);
console.log(globlaStore);
//别名
export const useGloblaStore = globlaStore.useStore;
export const GloblaProvider = globlaStore.Provider;
export const globlaApplyStore = globlaStore.applyStore;
