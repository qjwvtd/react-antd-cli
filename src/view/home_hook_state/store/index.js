// import createLiveStore from 'use-live-store';
import createLiveStore from './../lib';
import user from './reducer/user';
import project from './reducer/project';
import girl from './reducer/girl';

const reducerMap = { user, project, girl };
const liveStore = createLiveStore(reducerMap);

export const useStore = liveStore.useStore;
export const Wapper = liveStore.Wapper;
