import { takeLatest, call, all, put } from 'redux-saga/effects';

import { api } from '../../../services/api';
import i18n from '../../../locales/i18n';
import { setDataSource, setUsers, setDepartments, setGroups } from './actions';

export function* getDataSource({ payload }) {
	try {
		let { url, pagination, filters } = payload;

		if (pagination === undefined) {
			pagination = { current: 1 };
		}

		filters += 'deleted=false&';

		const response = yield call(
			api.get,
			`${url}/page?${filters}page=${pagination.current - 1}`
		);
		let dataSource = [];

		if (response.data.totalElements > 0) {
			dataSource = response.data.content.map(value => {
				return {
					key: value.id,
					...value,
				};
			});

			pagination = {
				current: pagination.current,
				total: response.data.totalElements,
				showTotal: (total, range) =>
					`${range[0]}-${range[1]} ${i18n.t(
						'table.between.pagination'
					)} ${total} ${i18n.t('table.total.pagination')}`,
			};
		} else {
			pagination = {};
		}

		yield put(setDataSource(dataSource, pagination));
	} catch (error) {
		console.tron.log(error);
	}
}

export function* getUsers() {
	try {
		const response = yield call(api.get, 'users');
		let data = [];

		if (response.data.length > 0) {
			data = response.data.map(value => value);
		}
		console.tron.log(data);

		yield put(setUsers(data));
	} catch (error) {
		console.tron.log(error);
	}
}

export function* getDepartments() {
	try {
		const response = yield call(api.get, 'departments');
		let data = [];

		if (response.data.length > 0) {
			data = response.data.map(value => value);
		}
		console.tron.log(data);

		yield put(setDepartments(data));
	} catch (error) {
		console.tron.log(error);
	}
}

export function* getGroups() {
	try {
		const response = yield call(api.get, 'groups');
		let data = [];

		if (response.data.length > 0) {
			data = response.data.map(value => value);
		}
		console.tron.log(data);

		yield put(setGroups(data));
	} catch (error) {
		console.tron.log(error);
	}
}

export default all([
	takeLatest('@configuration/GET_DATASOURCE', getDataSource),
	takeLatest('@configuration/GET_USERS', getUsers),
	takeLatest('@configuration/GET_DEPARTMENTS', getDepartments),
	takeLatest('@configuration/GET_GROUPS', getGroups),
]);
