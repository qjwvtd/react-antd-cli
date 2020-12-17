import { combineReducers } from 'redux';
//import reducer
import project from './project';
import good from './good';
/**
 * merge reducer
 * 所有的reducer在这里合并
 */
export default combineReducers({
    project, good
});
