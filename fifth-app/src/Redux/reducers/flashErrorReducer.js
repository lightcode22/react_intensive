export default function flashErrorReducer(
	state = { errorMessage: null },
	action
) {
	if (action.type === "set_flash_error") {
		return {
			...state,
			errorMessage: action.message,
		};
	}

	if (action.type === "clear_flash_error") {
		return {
			...state,
			errorMessage: null,
		};
	}

	return state;
}
