import { useState } from "react";
import { useDispatch } from "react-redux";
import burger from "../../../icons/burger.svg";
import PopupOverlay from "../../Modals/popupOverlay";
import styles from "./taskControls.module.css";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../../redux/store";
import { AnyAction } from "redux";
import { updateTask } from "../../../redux/actions";
import { TaskType } from "../../../typescript/types/task.types";

type PropsType = {
	task: TaskType;
	onEditHandler: () => void;
};

export default function TaskControls({ task, onEditHandler }: PropsType) {
	const [showDropDown, setShowDropDown] = useState(false);

	const dispatch = useDispatch();

	const onOpenModalHandler = () => {
		setShowDropDown(true);
	};

	const onFavouriteClickHandler = () => {
		setShowDropDown(false);
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			updateTask({
				...task,
				favourite: !task.favourite,
			})
		);
	};

	const onCompleteClickHandler = () => {
		setShowDropDown(false);
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			updateTask({
				...task,
				completed: !task.completed,
			})
		);
	};

	const onRemoveClickHandler = () => {
		setShowDropDown(false);
		dispatch({
			type: "open_remove_modal",
			id: task.id,
			title: task.title,
			createdOn: task.createdOn,
		});
	};

	const onEditClickHandler = () => {
		setShowDropDown(false);
		onEditHandler();
	};

	const onOutsideClickHandler = () => {
		setShowDropDown(false);
	};

	return (
		<div>
			<img
				src={burger}
				onClick={onOpenModalHandler}
				className={styles.controlsIcon}
				alt="burger_icon"
			/>

			<ul
				className={`${styles.dropDown} ${
					showDropDown ? styles.showDropDown : ""
				} `}
			>
				<li onClick={onFavouriteClickHandler}>
					{task.favourite ? "Убрать из избранного" : "В избранное"}
				</li>
				<li onClick={onCompleteClickHandler}>
					{task.completed ? "Вернуть в работу" : "Выполнено"}
				</li>
				<li onClick={onEditClickHandler}>Редактировать</li>
				<li onClick={onRemoveClickHandler}>Удалить</li>
			</ul>

			<PopupOverlay
				isOpen={showDropDown}
				onOverlayClickHandler={onOutsideClickHandler}
			/>
		</div>
	);
}
