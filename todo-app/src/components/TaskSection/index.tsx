import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../../redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { fetchAllTasks } from "../../redux/actions";
import Loader from "../Loader";
import TaskList from "./taskList";
import { useEffect } from "react";
import { TaskType } from "../../typescript/types/task.types";

type FiltersType = {
	[key: string]: (arg: TaskType) => boolean;
};

const filters: FiltersType = {
	done: (task: TaskType) => task.completed,
	inProcess: (task: TaskType) => !task.completed,
	favourite: (task: TaskType) => task.favourite && !task.completed,
};

export default function TaskSection() {
	const isFetching = useSelector(
		(state: RootStateType) => state.tasks.isFetching
	);
	const allTasks = useSelector((state: RootStateType) => state.tasks.allTasks);
	const filter = useSelector((state: RootStateType) => state.tasks.filter);

	const tasksToDisplay = () => {
		if (filter === "") {
			return allTasks;
		}

		const filterFunc = filters[filter];
		return allTasks.filter(filterFunc);
	};

	const dispatch = useDispatch();

	useEffect(() => {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			fetchAllTasks()
		);
	}, []);

	return (
		<section>
			{isFetching ? <Loader /> : <TaskList tasks={tasksToDisplay()} />}
		</section>
	);
}
