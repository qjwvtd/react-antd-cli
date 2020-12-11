import { observable } from 'mobx';
const store = {
    list: [],
    init() {
        setTimeout(() => {
            this.list = ['Tony', 'Andy', 'Tom'];
        }, 1000);
    },
    updateItem(value, index) {
        this.list[index] = value;
    }
};
const personStore = observable(store);
export default personStore;


