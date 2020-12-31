import createShareStore from '@qjwvtd/share-store';
import girl from './reducer/girl';
const girlRducer = { girl };
const { useStore, useProvider, getAsyncStore } = createShareStore(girlRducer);

export const useGirlStroe = useStore;
export const useGirlProvider = useProvider;
export const getGirlAsyncStore = getAsyncStore;
