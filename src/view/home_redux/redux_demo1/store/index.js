import createLiveStore from 'live-store';
//import reducer
import project from './project';
import good from './good';
//merge reducer
const reducer = { project, good };
const [useStore, applyStore] = createLiveStore(reducer);
export { useStore, applyStore };
