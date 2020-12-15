import { user } from './user';
import { project } from './project';
//注册store
const stores = {
    project,
    user
};
export default { ...stores };
