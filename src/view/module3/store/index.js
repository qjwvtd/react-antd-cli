import React from 'react';
import globalHook from 'use-global-hook';
import userInfo from './state';
import userActions from './actions';
const globalUser = globalHook(React, userInfo, userActions);
export default globalUser;
