import createLiveStore from 'use-live-store';
import user from './reducer/user';
import project from './reducer/project';
const globlaReducer = { user, project };
const { useStore, useProvider, getAsyncStore } = createLiveStore(globlaReducer);

export const useGloblaStroe = useStore;
export const useGloblaProvider = useProvider;
export const getGloblaAsyncStore = getAsyncStore;
