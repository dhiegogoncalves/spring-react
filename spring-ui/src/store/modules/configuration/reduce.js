import produce from 'immer';

const INITIAL_STATE = {
	dataSource: [],
	tableLoading: false,
	pagination: {},
	filters: '',
	users: [],
	departments: [],
	groups: [],
};

export default function auth(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@configuration/GET_DATASOURCE': {
				draft.tableLoading = true;
				draft.dataSource = [];
				draft.pagination = [];
				break;
			}

			case '@configuration/SET_DATASOURCE': {
				draft.dataSource = action.payload.dataSource;
				draft.pagination = action.payload.pagination;
				draft.tableLoading = false;
				break;
			}

			case '@configuration/SET_SEARCH_FIELDS': {
				draft.filters = action.payload.filters;
				break;
			}

			case '@configuration/SET_USERS': {
				draft.users = action.payload.users;
				break;
			}

			case '@configuration/SET_DEPARTMENTS': {
				draft.departments = action.payload.departments;
				break;
			}

			case '@configuration/SET_GROUPS': {
				draft.groups = action.payload.groups;
				break;
			}
			default:
		}
	});
}
