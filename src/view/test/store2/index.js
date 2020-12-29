import createThinkStore from './lib';
import user from './user';
import project from './project';
import girl from './girl';

const reducers = { user, project, girl };

const { useThinkStore, useThinkProvider, asyncThinkStore } = createThinkStore(reducers);
//为避免命名冲突,这里别名
export const useGloblaStore = useThinkStore;
export const useGloblaProvider = useThinkProvider;
export const globlaAsyncStore = asyncThinkStore;


