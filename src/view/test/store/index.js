import { createLiveStore, createActionMap } from './../lib';
import girl from './girl';
import project from './project';
import girlAction from './girl/action';
import projectAction from './project/action';

const reducers = { girl, project };
const actionMap = { girlAction, projectAction };

const { Wapper, useStore, observer } = createLiveStore(reducers);

export const actions = createActionMap(actionMap);
export { Wapper, useStore, observer };





