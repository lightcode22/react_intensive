import TaskItem from "../taskItem";
import styles from "./taskList.module.css";
import { TaskType } from "../../../typescript/types/task.types";

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
	return (
		<div className={styles.taskList}>
			{tasks.map((task) => (
				<TaskItem task={task} key={task.id} />
			))}
		</div>
	);
}
