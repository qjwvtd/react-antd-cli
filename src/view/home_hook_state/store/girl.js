import createLiveStore from 'use-live-store';
import girl from './reducer/girl';
const girlRducer = { girl };
const { useStore, useProvider, getAsyncStore } = createLiveStore(girlRducer);

export const useGirlStroe = useStore;
export const useGirlProvider = useProvider;
export const getGirlAsyncStore = getAsyncStore;
