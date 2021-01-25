// import createLiveStore from './../lib';
import useUser from './../action/user';
import useProject from './../action/project';

export const hookStateMap = { useUser, useProject };

export function createHookStore(hooksMap) {
    console.log(hooksMap);
}
