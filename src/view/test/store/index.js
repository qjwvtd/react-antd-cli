import createLiveStore from './../lib';
import user from './../action/user';
import project from './../action/project';

const actionMap = { user, project };

const live = createLiveStore(actionMap);
export const GloblaProvider = live.Provider;
export const useGloblaStore = live.useStore;
