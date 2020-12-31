import createShareStore from '@qjwvtd/share-store';
import user from './reducer/user';
import project from './reducer/project';
const globlaReducer = { user, project };
console.log(createShareStore(globlaReducer));
const { useStore, useProvider, getAsyncStore } = createShareStore(globlaReducer);
console.log(createShareStore(globlaReducer));

export const useGloblaStroe = useStore;
export const useGloblaProvider = useProvider;
export const getGloblaAsyncStore = getAsyncStore;
