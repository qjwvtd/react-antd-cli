import createLiveStore from './../lib';
import user from './reducer/user';
import project from './reducer/project';
import girl from './reducer/girl';
import { initGirl, initProject } from './action';

const reducerMap = { user, project, girl };
const actionMap = { initGirl, initProject };
const liveStore = createLiveStore(reducerMap, actionMap);

export const useStore = liveStore.useStore;
export const Wapper = liveStore.Wapper;
