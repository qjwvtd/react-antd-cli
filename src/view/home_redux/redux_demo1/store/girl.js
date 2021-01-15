import createHookStore from 'live-store';
//import reducer
import girl from './../reducer/girl';
//merge reducer
const reducer = { girl };
const useStore = createHookStore(reducer);
export const useGirlStore = useStore;
