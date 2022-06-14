import { RootStateType } from "../../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import styles from "./taskActionModal.module.css";

export default function TaskActionModal() {
	const isOpen = useSelector((state: RootStateType) => state.taskAction.isOpen);
	const id = useSelector((state: RootStateType) => state.taskAction.id);
	const title = useSelector((state: RootStateType) => state.taskAction.title);
	const createdOn = useSelector(
		(state: RootStateType) => state.taskAction.createdOn
	);

	const dispatch = useDispatch();

	if (!isOpen) return null;

	const onCloseHandler = () => {
		dispatch({ type: "close_action_modal" });
	};

	const onRemoveTaskHandler = () => {
		dispatch({ type: "remove_task", id });
		dispatch({ type: "close_action_modal" });
	};

	return (
		<div className={styles.modalWindow}>
			<div className={styles.modalHeading}>
				<h4 className={styles.modalHeadingText}>
					Вы действительно хотите удалить задачу?
				</h4>
				<button
					type="button"
					className={styles.closeButton}
					onClick={onCloseHandler}
				>
					x
				</button>
			</div>
			<p className={styles.title}>{title}</p>
			<p>Дата создания: {createdOn.toLocaleString("ru")}</p>
			<div className={styles.buttonsBlock}>
				<button
					type="button"
					onClick={onCloseHandler}
					className={`${styles.button} ${styles.green}`}
				>
					Отмена
				</button>
				<button
					type="button"
					onClick={onRemoveTaskHandler}
					className={`${styles.button} ${styles.red}`}
				>
					Да, удалить
				</button>
			</div>
		</div>
	);
}
