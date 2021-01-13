import createLiveStore from './../lib';
//import reducer
import project from './../reducer/project';
import good from './../reducer/good';
//merge reducer
const reducer = { project, good };
const [useStore] = createLiveStore(reducer);
export { useStore };
