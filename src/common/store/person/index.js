import { observable } from 'mobx';

const personStore = observable({
    list: [],
    init() {
        setTimeout(() => {
            this.list = ['Tony', 'Andy', 'Tom', 'Cat', 'HanMeimei'];
        }, 1000);
    },
    updateItem(value, index) {
        this.list[index] = value;
    }
});
export default personStore;

