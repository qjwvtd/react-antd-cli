import { getProject } from '@/common/api/project';
export default {
    name: 'dsfadsfadsa',
    address: 'dsfadsafdsa',
    initProject: function (setState, state) {
        getProject().then((result) => {
            state.project.name = result.name;
            state.project.address = result.address;
            setState(state);
        });
    },
    updateProjectAddres: function (setState, state, params) {
        state.project.address = params;
        setState(state);
    }
};
