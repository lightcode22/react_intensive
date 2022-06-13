import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import burger from "../../../burger.svg";
import PopupOverlay from "../../Modals/popupOverlay";
import styles from "./taskControls.module.css";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../../Redux/store";
import { AnyAction } from "redux";
import { updateTask, removeTask } from "../../../Redux/actions";
import { TaskType } from "../../../Redux/reducers/tasksReducer";

type PropsType = {
	id?: number;
	completed?: boolean;
	favourite?: boolean;
	title?: string;
	createdOn?: Date;
};

export default function TaskControls({
	task,
	onEditHandler,
}: {
	task?: PropsType;
	onEditHandler: () => void;
}) {
	const [showDropDown, setShowDropDown] = useState(false);

	const menuRef = useRef(null);

	const dispatch = useDispatch();

	const onOpenModalHandler = () => {
		setShowDropDown(true);
	};

	const onFavouriteClickHandler = () => {
		setShowDropDown(false);
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			updateTask({
				...(task as TaskType),
				favourite: !(task as PropsType).favourite,
			})
		);
	};

	const onCompleteClickHandler = () => {
		setShowDropDown(false);
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			updateTask({
				...(task as TaskType),
				completed: !(task as PropsType).completed,
			})
		);
	};

	const onRemoveClickHandler = () => {
		setShowDropDown(false);
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			removeTask((task as PropsType).id as number)
		);
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
				ref={menuRef}
				className={`${styles.dropDown} ${
					showDropDown ? styles.showDropDown : ""
				} `}
			>
				<li onClick={onFavouriteClickHandler}>
					{(task as PropsType).favourite
						? "Убрать из избранного"
						: "В избранное"}
				</li>
				<li onClick={onCompleteClickHandler}>
					{(task as PropsType).completed ? "Вернуть в работу" : "Выполнено"}
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
