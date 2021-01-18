import { getGirlDataApi } from '@/common/api/public';
export function initGirl() {
    return function (dispatch) {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                dispatch({ type: 'init_girl', data: res.data });
            }
        });
    };
}
