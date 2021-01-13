import createLiveStore from './../lib';
//import reducer
import girl from './../reducer/girl';
//merge reducer
const reducer = { girl };
const [useGirlStore] = createLiveStore(reducer);
export { useGirlStore };
