import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../Redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchAllTasks } from "../../Redux/actions";
import Loader from "../Loader";
import TaskList from "./taskList";
import { TaskType } from "../../Redux/reducers/tasksReducer";

export default function TaskSection() {
	const isFetching = useSelector(
		(state: RootStateType) => state.tasks.isFetching
	);
	const allTasks = useSelector((state: RootStateType) => state.tasks.allTasks);
	const filter = useSelector((state: RootStateType) => state.tasks.filter);

	const tasksToShow = allTasks.filter((task) => {
		if (filter === "done") {
			return (task as TaskType).completed;
		}

		if (filter === "inProcess") {
			return !(task as TaskType).completed;
		}

		if (filter === "favourite") {
			return (task as TaskType).favourite && !(task as TaskType).completed;
		}

		return task;
	});

	const dispatch = useDispatch();

	if (allTasks.length === 0 && !isFetching) {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			fetchAllTasks()
		);
	}

	return (
		<section>
			{isFetching ? <Loader /> : <TaskList tasks={tasksToShow} />}
		</section>
	);
}
