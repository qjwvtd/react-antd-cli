import createLiveStore from './../lib';
import girl from './../action/girl';


const live = createLiveStore({ girl });
export const GirlProvider = live.Provider;
export const useGirlStore = live.useStore;
