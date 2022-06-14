type FlashErrorStateType = {
	errorMessage: string | null;
};

type ActionType = {
	type: string;
	message: string;
};

export default function flashErrorReducer(
	state: FlashErrorStateType = { errorMessage: null },
	action: ActionType
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
