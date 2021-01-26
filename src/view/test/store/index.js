import createHookState from './../lib';
import girl from './../action/girl';
import user from './../action/user';
import project from './../action/project';

const actionMap = { girl, user, project };

const [useHookStore, Wapper] = createHookState(actionMap);
export const useStore = useHookStore;
export const Provider = Wapper;
