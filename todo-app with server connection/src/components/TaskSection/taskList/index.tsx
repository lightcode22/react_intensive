import TaskItem from "../taskItem";
import styles from "./taskList.module.css";

type TaskType = {
	id?: number;
	title?: string;
	completed?: boolean;
	favourite?: boolean;
	createdOn?: Date;
};

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
	return (
		<div className={styles.taskList}>
			{tasks.map((task) => (
				<TaskItem task={task} key={task.id} />
			))}
		</div>
	);
}
