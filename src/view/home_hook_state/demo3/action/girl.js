import { getGirlDataApi } from '@/common/api/public';
export default {
    list: [],
    initGirl: function (setState, state) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                state.girl.list = res.data;
                setState(state);
            }
        });
    }
};
