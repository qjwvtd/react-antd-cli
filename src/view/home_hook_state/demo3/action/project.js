import { getProject } from '@/common/api/project';
export default {
    info: {
        name: 'dsfadsfadsa',
        address: 'dsfadsafdsa'
    },
    initProject: function (setState, state) {
        getProject().then((result) => {
            state.project.info = result;
            setState(state);
        });
    },
    updateProjectAddres: function (setState, state, params) {
        state.project.info.address = params;
        setState(state);
    }
};
