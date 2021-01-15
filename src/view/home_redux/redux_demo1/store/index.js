import createHookStore from 'live-store';
//import reducer
import project from './../reducer/project';
import good from './../reducer/good';
//merge reducer
const reducer = { project, good };
const useStore = createHookStore(reducer);
export const useGloblaStore = useStore;
