import { observable, action } from 'mobx';

class Person {
    @observable list = [];
    @action init() {
        setTimeout(() => {
            this.list = ['Tony', 'Andy', 'Tom', 'Cat', 'HanMeimei'];
        }, 1000);
    }
    @action updateItem(value, index) {
        this.list[index] = value;
    }
}
const personStore = new Person();
export default personStore;

