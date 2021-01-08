export default {
    initGirl: (data) => {
        return function (dispatch) {
            dispatch({ type: 'init_girl', data: data });
        };
    }
};
