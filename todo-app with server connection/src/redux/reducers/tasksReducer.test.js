import taskReducer from "./tasksReducer.ts";

const payload = [
	[1, "task 1", true, true, "15/06/2022"],
	[2, "task 2", false, true, "16/06/2022"],
];

const tasksFromServer = payload.map((el) => ({
	id: el[0],
	title: el[1],
	completed: Boolean(el[2]),
	favourite: Boolean(el[3]),
	createdOn: el[4],
}));

const initialState = {
	allTasks: [],
	isFetching: false,
	filter: "",
};

const cachedState = {
	allTasks: tasksFromServer,
	isFetching: false,
	filter: "",
};

describe("caching tasks", () => {
	test("cache_tasks with payload if no tasks", () => {
		const state = taskReducer(initialState, { type: "cache_tasks", payload });
		expect(state).toEqual({
			allTasks: tasksFromServer,
			isFetching: false,
			filter: "",
		});
	});

	test("cache_tasks with empty array if no tasks", () => {
		const state = taskReducer(initialState, {
			type: "cache_tasks",
			payload: [],
		});
		expect(state).toEqual(initialState);
	});

	test("re-cache_tasks with payload if cached tasks", () => {
		const state = taskReducer(cachedState, { type: "cache_tasks", payload });
		expect(state).toEqual({
			allTasks: tasksFromServer,
			isFetching: false,
			filter: "",
		});
	});

	test("re-cache_tasks with empty array if cached tasks", () => {
		const state = taskReducer(cachedState, {
			type: "cache_tasks",
			payload: [],
		});
		expect(state).toEqual(initialState);
	});
});
