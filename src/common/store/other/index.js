const store = {
    name: '',
    updateName: function (value) {
        console.log(value);
        Object.defineProperty(store, 'name', {
            set: function (newValue) {
                console.log('赋值操作' + newValue);
                return value;
            },
            get: function () {
                console.log('取值操作');
                return value;
            }
        });
    }
};
export default store;
