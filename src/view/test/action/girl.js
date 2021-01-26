import { getGirlDataApi } from '@/common/api/public';

export default {
    list: [],
    initGirl: function (setState, state) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                for (let key in res.data[0]) {
                    state.girl[key] = res.data[0][key];
                }
                setState(state);
            }
        });
    }
};
