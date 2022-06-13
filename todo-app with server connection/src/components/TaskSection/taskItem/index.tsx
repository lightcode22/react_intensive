import { useState } from "react";
import TaskEditBlock from "../taskEditBlock";
import { useDispatch } from "react-redux";
import star from "../../../star.svg";
import TaskControls from "../taskControls";
import { updateTask } from "../../../Redux/actions";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../../Redux/store";
import { AnyAction } from "redux";
import { TaskType } from "../../../Redux/reducers/tasksReducer";
import styles from "./taskItem.module.css";

export default function TaskItem({ task }: { task: TaskType }) {
	const status = task.completed ? "done" : "inProgress";

	const dispatch = useDispatch();

	const [isEditModeOn, setIsEditModeOn] = useState(false);

	const onEditClickHandler = () => {
		setIsEditModeOn(true);
	};

	const switchEditModeOff = () => {
		setIsEditModeOn(false);
	};

	const onStarClickHandler = () => {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			updateTask({
				...task,
				favourite: !task.favourite,
			})
		);
	};

	return (
		<div className={`${styles.taskItem} ${styles[status]}`}>
			{isEditModeOn ? (
				<TaskEditBlock task={task} onSubmitHander={switchEditModeOff} />
			) : (
				<div className={styles.taskHeading}>
					{task.favourite && (
						<img
							className={styles.star}
							src={star}
							onClick={onStarClickHandler}
							alt="favourite_icon"
						/>
					)}
					<h4 className={styles.taskTitle}>{task.title}</h4>
				</div>
			)}
			<TaskControls task={task} onEditHandler={onEditClickHandler} />
		</div>
	);
}
