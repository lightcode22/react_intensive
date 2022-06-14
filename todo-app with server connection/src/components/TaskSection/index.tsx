import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchAllTasks } from "../../redux/actions";
import Loader from "../Loader";
import TaskList from "./taskList";

export default function TaskSection() {
	const isFetching = useSelector(
		(state: RootStateType) => state.tasks.isFetching
	);
	const allTasks = useSelector((state: RootStateType) => state.tasks.allTasks);
	const filter = useSelector((state: RootStateType) => state.tasks.filter);

	let tasksToDisplay = allTasks;

	if (filter !== "") {
		tasksToDisplay = allTasks.filter((task) => {
			if (filter === "done") {
				return task.completed;
			}

			if (filter === "inProcess") {
				return !task.completed;
			}

			if (filter === "favourite") {
				return task.favourite && !task.completed;
			}
		});
	}

	const dispatch = useDispatch();

	useEffect(() => {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			fetchAllTasks()
		);
	}, []);

	return (
		<section>
			{isFetching ? <Loader /> : <TaskList tasks={tasksToDisplay} />}
		</section>
	);
}
