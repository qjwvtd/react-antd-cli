import { getGirlDataApi } from '@/common/api/public';
export default {
    initGirl: () => {
        return (dispatch) => {
            getGirlDataApi().then((res) => {
                if (res.status === 100) {
                    dispatch({ type: 'init_girl', data: res.data });
                }
            });
        };
    }
};
