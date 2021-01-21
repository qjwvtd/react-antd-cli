import createLiveStore from './lib';
import { project, girl } from './action';

const actionMap = { project, girl };

const live = createLiveStore(actionMap);
export const Wapper = live.Wapper;
export const useStore = live.useStore;
