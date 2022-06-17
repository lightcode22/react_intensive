import { TaskType } from "../../typescript/types/task.types";

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

const initialState = {
	allTasks: [],
	isFetching: false,
	filter: "",
};

export default function tasksReducer(
	state: TasksStateType = initialState,
	action: ActionType
): TasksStateType {
	if (action.type === "cache_tasks") {
		const payload = action.payload ? action.payload : [];

		return {
			...state,
			allTasks: payload,
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
		if (!action.filter) {
			return state;
		}

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

	return state;
}
