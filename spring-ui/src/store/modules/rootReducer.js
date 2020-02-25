import { combineReducers } from 'redux';

import auth from './auth/reduce';
import configuration from './configuration/reduce';

export default combineReducers({
	auth,
	configuration,
});
