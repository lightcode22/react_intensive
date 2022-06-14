import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchAllTasks } from "../../redux/actions";
import Loader from "../Loader";
import TaskList from "./taskList";
import { useEffect } from "react";

export default function TaskSection() {
	const isFetching = useSelector(
		(state: RootStateType) => state.tasks.isFetching
	);
	let tasks = useSelector((state: RootStateType) => state.tasks.allTasks);
	const filter = useSelector((state: RootStateType) => state.tasks.filter);

	tasks = tasks.filter((task) => {
		if (filter === "done") {
			return task.completed;
		}

		if (filter === "inProcess") {
			return !task.completed;
		}

		if (filter === "favourite") {
			return task.favourite && !task.completed;
		}

		return task;
	});

	const dispatch = useDispatch();

	useEffect(() => {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			fetchAllTasks()
		);
	}, [filter]);

	return (
		<section>{isFetching ? <Loader /> : <TaskList tasks={tasks} />}</section>
	);
}
