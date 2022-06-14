import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./taskEditBlock.module.css";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../../redux/store";
import { AnyAction } from "redux";
import { updateTask } from "../../../redux/actions";
import { TaskType } from "../../../typescript/types/task.types";

type PropsType = {
	task: TaskType;
	onSubmitHander: () => void;
};

export default function TaskEditBlock({ task, onSubmitHander }: PropsType) {
	const [inputText, setInputText] = useState(task.title);
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
					updateTask({ ...task, title: inputText })
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
				className={styles.input}
				ref={inputRef}
				value={inputText}
				onInput={onInputHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</div>
	);
}
