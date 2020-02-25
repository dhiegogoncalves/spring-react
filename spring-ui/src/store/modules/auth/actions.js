export function loginRequest(username, password) {
	return {
		type: '@auth/LOGIN_REQUEST',
		payload: { username, password },
	};
}

export function loginSuccess(token) {
	return {
		type: '@auth/LOGIN_SUCCESS',
		payload: { token },
	};
}

export function loginFailure() {
	return {
		type: '@auth/LOGIN_FAILURE',
	};
}

export function languageChange(data) {
	return {
		type: '@auth/LANGUAGE_CHANGE',
		payload: { data },
	};
}

export function logout() {
	return {
		type: '@auth/LOGOUT',
	};
}
