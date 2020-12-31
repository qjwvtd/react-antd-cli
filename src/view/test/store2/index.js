import createThink from '@/view/home_hook_state/dist';
import user from './user';
import project from './project';
import girl from './girl';

const reducers = { user, project, girl };

export default createThink(reducers);


