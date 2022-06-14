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

const findTaskById = (tasks: TaskType[], id: number) => {
	return tasks.find((task) => task.id === id);
};

export default function tasksReducer(
	state: TasksStateType = initialState,
	action: ActionType
): TasksStateType {
	if (action.type === "cache_tasks") {
		const payload = action.payload ? action.payload : [];

		return {
			...state,
			allTasks: [...payload],
		};
	}

	if (action.type === "add_new_task") {
		if (!action.title) {
			return state;
		}

		let id = 0;

		if (state.allTasks.length !== 0) {
			id = state.allTasks[state.allTasks.length - 1].id;
		}

		const newTask = {
			id: id + 1,
			title: action.title,
			completed: false,
			favourite: false,
			createdOn: new Date(),
		};

		return {
			...state,
			allTasks: [...state.allTasks, newTask],
		};
	}

	if (action.type === "edit_task") {
		if (!action.id) {
			return state;
		}

		const taskToEdit = findTaskById(state.allTasks, action.id);

		if (taskToEdit) {
			const updatedTasks = state.allTasks;

			const index = updatedTasks.indexOf(taskToEdit);

			if (action.title) {
				updatedTasks[index].title = action.title;
			}

			return {
				...state,
				allTasks: [...updatedTasks],
			};
		}
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

	if (action.type === "switch_favourite_status") {
		if (!action.id) {
			return state;
		}

		const taskToEdit = findTaskById(state.allTasks, action.id);

		if (taskToEdit) {
			const updatedTasks = state.allTasks;

			const index = updatedTasks.indexOf(taskToEdit);

			updatedTasks[index].favourite = !updatedTasks[index].favourite;

			return {
				...state,
				allTasks: [...updatedTasks],
			};
		}
	}

	if (action.type === "switch_completed_status") {
		if (!action.id) {
			return state;
		}

		const taskToEdit = findTaskById(state.allTasks, action.id);

		if (taskToEdit) {
			const updatedTasks = state.allTasks;

			const index = updatedTasks.indexOf(taskToEdit);

			updatedTasks[index].completed = !updatedTasks[index].completed;

			return {
				...state,
				allTasks: [...updatedTasks],
			};
		}
	}

	if (action.type === "remove_task") {
		if (!action.id) {
			return state;
		}

		const taskToRemove = findTaskById(state.allTasks, action.id);

		if (taskToRemove) {
			const updatedTasks = state.allTasks;

			const index = updatedTasks.indexOf(taskToRemove);

			if (index !== -1) {
				updatedTasks.splice(index, 1);
			}

			return {
				...state,
				allTasks: [...updatedTasks],
			};
		}
	}

	return state;
}
