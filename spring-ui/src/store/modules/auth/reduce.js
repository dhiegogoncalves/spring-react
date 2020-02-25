import produce from 'immer';

const INITIAL_STATE = {
	token: null,
	signed: false,
	loading: false,
	language: 'pt',
};

export default function auth(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@auth/LOGIN_REQUEST': {
				draft.loading = true;
				break;
			}

			case '@auth/LOGIN_SUCCESS': {
				draft.token = action.payload.token;
				draft.signed = true;
				draft.loading = false;
				break;
			}

			case '@auth/LOGIN_FAILURE': {
				draft.loading = false;
				break;
			}

			case '@auth/LANGUAGE_CHANGE': {
				draft.language = action.payload.data;
				break;
			}

			case '@auth/LOGOUT': {
				draft.token = null;
				draft.signed = false;
				break;
			}

			default:
		}
	});
}
