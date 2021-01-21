import { getGirlDataApi } from '@/common/api/public';
import { getProject } from '@/common/api/project';
export const girl = {
    list: [],
    initGirl: function ({ setState, state }) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                state.girl.list = res.data;
                setState(state);
            }
        });
    }
};
export const project = {
    info: {
        name: 'dsfadsfadsa',
        address: 'dsfadsafdsa'
    },
    initProject: function ({ setState, state }) {
        getProject().then((result) => {
            state.project.info = result;
            setState(state);
        });
    },
    updateProjectAddress: function ({ setState, state, params }) {
        console.log(params);
        setState(state);
    }
};
