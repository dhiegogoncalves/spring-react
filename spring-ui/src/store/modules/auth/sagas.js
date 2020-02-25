import { takeLatest, call, put, all } from 'redux-saga/effects';
import { message } from 'antd';

import i18n from '../../../locales/i18n';
import { api } from '../../../services/api';
import { loginSuccess, loginFailure } from './actions';
import history from '../../../services/history';

export function* login({ payload }) {
	try {
		const { username, password } = payload;

		if (username === 'demo' && password === 'demo') {
			yield put(loginSuccess('demo'));
			history.push('/home');
		} else {
			const response = yield call(api.post, 'login', {
				username,
				password,
			});

			const { token } = response.data;

			api.defaults.headers.Authorization = `Bearer ${token}`;

			yield put(loginSuccess(token));
			history.push('/home');
		}
	} catch (error) {
		message.error(i18n.t('authentication.failed.message'), 4);
		yield put(loginFailure());
	}
}

export function setToken({ payload }) {
	if (!payload) return;
	const { token } = payload.auth;
	if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function logout() {
	history.push('/');
}

export default all([
	takeLatest('persist/REHYDRATE', setToken),
	takeLatest('@auth/LOGIN_REQUEST', login),
	takeLatest('@auth/LOGOUT', logout),
]);
