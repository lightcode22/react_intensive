export type TaskType = {
	id: number;
	title: string;
	completed: boolean;
	favourite: boolean;
	createdOn: Date;
};

type TasksStateType = {
	allTasks: TaskType[];
	isFetching: boolean;
	filter: string;
};

type ActionType = {
	type: string;
	payload?: [];
	title?: string;
	id?: number;
	filter?: string;
};

const initialState: TasksStateType = {
	allTasks: [],
	isFetching: false,
	filter: "",
};

export default function tasksReducer(state = initialState, action: ActionType) {
	if (action.type === "cache_tasks") {
		const payload = action.payload ? action.payload : [];

		const dataObject = payload.map((el) => ({
			id: el[0],
			title: el[1],
			completed: Boolean(el[2]),
			favourite: Boolean(el[3]),
			createdOn: el[4],
		}));

		return {
			...state,
			allTasks: [...dataObject],
		};
	}

	if (action.type === "fetching_started") {
		return {
			...state,
			isFetching: true,
		};
	}

	if (action.type === "fetching_done") {
		return {
			...state,
			isFetching: false,
		};
	}

	if (action.type === "set_filter") {
		if (action.filter) {
			if (action.filter === state.filter) {
				return {
					...state,
					filter: "",
				};
			}

			return {
				...state,
				filter: action.filter,
			};
		}
	}

	return state;
}
