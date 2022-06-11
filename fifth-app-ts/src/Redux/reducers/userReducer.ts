type ActionType = {
	type: string;
	username: string | null;
};

type StateType = {
	username: string | null;
};

export default function userReducer(
	state: StateType = { username: null },
	action: ActionType
) {
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
