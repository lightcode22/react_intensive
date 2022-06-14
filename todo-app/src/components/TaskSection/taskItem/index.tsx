import { useState } from "react";
import TaskEditBlock from "../taskEditBlock";
import { useDispatch } from "react-redux";
import star from "../../../star.svg";
import TaskControls from "../taskControls";
import styles from "./taskItem.module.css";
import { TaskType } from "../../../typescript/types/task.types";

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
		dispatch({ type: "switch_favourite_status", id: task.id });
	};

	return (
		<div className={`${styles.taskItem} ${styles[status]}`}>
			{isEditModeOn ? (
				<TaskEditBlock
					id={task.id}
					title={task.title}
					onSubmitHander={switchEditModeOff}
				/>
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
