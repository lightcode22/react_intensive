import { DispatchType } from "../store";

const TASKS_API_URL =
	"https://mocki.io/v1/978994ee-d990-426e-a34d-85e46d50f988";

export const fetchAllTasks = () => async (dispatch: DispatchType) => {
	dispatch({ type: "fetching_started" });

	try {
		const response = await fetch(TASKS_API_URL);
		const data = await response.json();
		dispatch({ type: "cache_tasks", payload: data });
	} catch (err: any) {
		dispatch({ type: "set_flash_error", message: err.message });
	} finally {
		dispatch({ type: "fetching_done" });
	}
};
