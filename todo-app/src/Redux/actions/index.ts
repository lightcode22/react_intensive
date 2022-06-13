import { DispatchType } from "../store";

const TASKS_API_URL =
	"https://mocki.io/v1/7af4fe70-f5c0-447b-b841-4344c176f2c2";

export const fetchAllTasks = () => (dispatch: DispatchType) => {
	dispatch({ type: "fetching_started" });

	fetch(TASKS_API_URL)
		.then((res) => res.json())
		.then((json) => {
			dispatch({ type: "cache_tasks", payload: json });
			dispatch({ type: "fetching_done" });
		})
		.catch((err) => {
			dispatch({ type: "fetching_done" });
			dispatch({ type: "set_flash_error", message: err.message });
		});
};
