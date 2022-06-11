export default function userReducer(state = { username: null }, action) {
	if (action.type === "login") {
		return {
			...state,
			username: action.username,
		};
	}

	if (action.type === "logout") {
		return {
			...state,
			username: null,
		};
	}

	return state;
}
