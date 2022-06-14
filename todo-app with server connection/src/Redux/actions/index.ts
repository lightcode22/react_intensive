import { TaskType } from "../../typescript/types/task.types";
import { DispatchType } from "../store";

const GET_TASKS_API_URL = "https://wtfreactapp.pythonanywhere.com/";
const POST_TASKS_API_URL = "https://wtfreactapp.pythonanywhere.com/task";

export const fetchAllTasks = () => async (dispatch: DispatchType) => {
	dispatch({ type: "fetching_started" });

	try {
		const response = await fetch(GET_TASKS_API_URL);
		const data = await response.json();
		dispatch({ type: "cache_tasks", payload: data });
	} catch (err: any) {
		dispatch({ type: "cache_tasks", payload: [] });
		dispatch({ type: "set_flash_error", message: err.message });
	} finally {
		dispatch({ type: "fetching_done" });
	}
};

export const addNewTask = (title: string) => async (dispatch: DispatchType) => {
	try {
		const response = await fetch(POST_TASKS_API_URL, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title }),
		});

		const data = await response.json();
		dispatch({ type: "cache_tasks", payload: data });
	} catch (err: any) {
		dispatch({ type: "set_flash_error", message: err.message });
	}
};

export const updateTask =
	(newTask: TaskType) => async (dispatch: DispatchType) => {
		try {
			const response = await fetch(POST_TASKS_API_URL, {
				method: "PUT",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...newTask }),
			});

			const data = await response.json();
			dispatch({ type: "cache_tasks", payload: data });
		} catch (err: any) {
			dispatch({ type: "set_flash_error", message: err.message });
		}
	};

export const removeTask = (id: number) => async (dispatch: DispatchType) => {
	try {
		const response = await fetch(`${POST_TASKS_API_URL}/${id}`, {
			method: "DELETE",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});

		const data = await response.json();
		dispatch({ type: "cache_tasks", payload: data });
	} catch (err: any) {
		dispatch({ type: "set_flash_error", message: err.message });
	}
};
