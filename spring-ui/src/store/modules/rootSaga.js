import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import configuration from './configuration/sagas';

export default function* rootSaga() {
	return yield all([auth, configuration]);
}
