import createLiveStore from './../lib';
import girl from './girl';
import project from './project';
import girlAction from './girl/action';
import projectAction from './project/action';

const reducerMap = { girl, project };
const actionMap = { girlAction, projectAction };

const { Wapper, useStore } = createLiveStore(reducerMap, actionMap);
export { Wapper, useStore };





