type StateType = {
	id: number | null;
	isOpen: boolean;
	title: string;
	createdOn: Date;
};

type ActionType = {
	type: string;
	id: number;
	title: string;
};

export default function taskActionReducer(
	state: StateType = {
		id: null,
		isOpen: false,
		title: "",
		createdOn: new Date(),
	},
	action: ActionType
) {
	if (action.type === "open_remove_modal") {
		return {
			...state,
			isOpen: true,
			id: action.id,
			title: action.title,
		};
	}

	if (action.type === "close_remove_modal") {
		return {
			...state,
			isOpen: false,
			id: null,
			title: "",
		};
	}

	return state;
}
