import createLiveStore from './../lib';
import girl from './../action/girl';


const live = createLiveStore({ girl });
export const GirlWapper = live.Wapper;
export const useGirlStore = live.useStore;
