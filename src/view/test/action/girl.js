import { getGirlDataApi } from '@/common/api/public';
export default {
    _id: null,
    url: null,
    desc: null,
    author: null,
    initGirl: function (setState, state) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                const option = res.data[0];
                state.girl._id = option._id;
                state.girl.url = option.url;
                state.girl.desc = option.desc;
                state.girl.author = option.author;
                setState(state);
            }
        });
    }
};
