import { TaskType } from "../reducers/tasksReducer";
import { DispatchType } from "../store";

const GET_TASKS_API_URL = "http://wtfreactapp.pythonanywhere.com/";
const POST_TASKS_API_URL = "http://wtfreactapp.pythonanywhere.com/task";

export const fetchAllTasks = () => (dispatch: DispatchType) => {
	dispatch({ type: "fetching_started" });

	fetch(GET_TASKS_API_URL)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			dispatch({ type: "cache_tasks", payload: json });
			dispatch({ type: "fetching_done" });
		})
		.catch((err) => {
			dispatch({ type: "fetching_done" });
			dispatch({ type: "set_flash_error", message: err.message });
		});
};

export const addNewTask = (data: string) => (dispatch: DispatchType) => {
	fetch(POST_TASKS_API_URL, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ title: data }),
	})
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((json) => {
			dispatch({ type: "cache_tasks", payload: json });
		})
		.catch((err) => {
			dispatch({ type: "set_flash_error", message: err.message });
		});
};

export const updateTask = (data: TaskType) => (dispatch: DispatchType) => {
	fetch(POST_TASKS_API_URL, {
		method: "PUT",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...data }),
	})
		.then((res) => res.json())
		.then((json) => {
			dispatch({ type: "cache_tasks", payload: json });
		})
		.catch((err) => {
			dispatch({ type: "set_flash_error", message: err.message });
		});
};

export const removeTask = (id: number) => (dispatch: DispatchType) => {
	fetch(`${POST_TASKS_API_URL}/${id}`, {
		method: "DELETE",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({}),
	})
		.then((res) => res.json())
		.then((json) => {
			dispatch({ type: "cache_tasks", payload: json });
		})
		.catch((err) => {
			dispatch({ type: "set_flash_error", message: err.message });
		});
};
