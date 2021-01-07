import createLiveStore from './lib';
import girl from './girl';
import project from './project';

const stores = { girl, project };

const { useStore, Provider, getAsyncStore } = createLiveStore(stores);

export const useGloblaStore = useStore;
export const GloblaProvider = Provider;
export const getGloblaAsyncStore = getAsyncStore;





