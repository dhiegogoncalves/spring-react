export function getDataSource(url, pagination, filters) {
	return {
		type: '@configuration/GET_DATASOURCE',
		payload: { url, pagination, filters },
	};
}

export function setDataSource(dataSource, pagination) {
	return {
		type: '@configuration/SET_DATASOURCE',
		payload: { dataSource, pagination },
	};
}

export function setSearchFields(filters) {
	return {
		type: '@configuration/SET_SEARCH_FIELDS',
		payload: { filters },
	};
}

export function getUsers() {
	return {
		type: '@configuration/GET_USERS',
		payload: {},
	};
}

export function setUsers(users) {
	return {
		type: '@configuration/SET_USERS',
		payload: { users },
	};
}

export function getDepartments() {
	return {
		type: '@configuration/GET_DEPARTMENTS',
		payload: {},
	};
}

export function setDepartments(departments) {
	return {
		type: '@configuration/SET_DEPARTMENTS',
		payload: { departments },
	};
}

export function getGroups() {
	return {
		type: '@configuration/GET_GROUPS',
		payload: {},
	};
}

export function setGroups(groups) {
	return {
		type: '@configuration/SET_GROUPS',
		payload: { groups },
	};
}
