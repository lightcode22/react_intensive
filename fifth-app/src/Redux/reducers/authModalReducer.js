export default function authModalReducer(
	state = { isAuthModalOpen: false },
	action
) {
	if (action.type === "open_auth_modal") {
		return {
			...state,
			isAuthModalOpen: true,
		};
	}

	if (action.type === "close_auth_modal") {
		return {
			...state,
			isAuthModalOpen: false,
		};
	}

	return state;
}
