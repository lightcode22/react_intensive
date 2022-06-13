import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./taskEditBlock.module.css";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../../Redux/store";
import { AnyAction } from "redux";
import { updateTask } from "../../../Redux/actions";
import { TaskType } from "../../../Redux/reducers/tasksReducer";

type TaskTypeNotRequired = {
	id?: number;
	title?: string;
	completed?: boolean;
	favourite?: boolean;
	createdOn?: Date;
};

type PropsType = {
	task: TaskTypeNotRequired;
	onSubmitHander: () => void;
};

export default function TaskEditBlock({ task, onSubmitHander }: PropsType) {
	const [inputText, setInputText] = useState(task.title as string);
	const [hasError, setHasError] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const dispatch = useDispatch();

	const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(e.target.value);

		if (e.target.value.length <= 160) {
			setHasError(false);
		} else {
			setHasError(true);
		}
	};

	const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (!hasError) {
				(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
					updateTask({ ...(task as TaskType), title: inputText })
				);
				onSubmitHander();
			}
		}
	};

	return (
		<div>
			<p className={styles.errorBlock}>
				{hasError &&
					`превышен лимит текста задачи на ${inputText.length - 160} символов`}
			</p>
			<input
				ref={inputRef}
				value={inputText}
				onInput={onInputHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</div>
	);
}
