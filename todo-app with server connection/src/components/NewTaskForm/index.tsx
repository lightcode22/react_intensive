import React, { useState } from "react";
import { useDispatch } from "react-redux";
import plus from "../../plus.svg";
import styles from "./newTaskForm.module.css";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "../../Redux/store";
import { AnyAction } from "redux";
import { addNewTask } from "../../Redux/actions";

export default function NewTaskForm() {
	const [hasError, setHasError] = useState(false);
	const [inputText, setInputText] = useState("");

	const dispatch = useDispatch();

	const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(e.target.value);

		if (e.target.value.length <= 160) {
			setHasError(false);
		} else {
			setHasError(true);
		}
	};

	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();

		if (!hasError) {
			const title = inputText;
			(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
				addNewTask(title)
			);
			setInputText("");
		}
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={onSubmitHandler}>
				<h3 className={styles.formHeading}>Добавить новую задачу</h3>

				<p className={styles.errorBlock}>
					{hasError &&
						`превышен лимит текста задачи на ${
							inputText.length - 160
						} символов`}
				</p>

				<div className={styles.formBlock}>
					<input
						className={styles.formInput}
						value={inputText}
						onInput={onInputHandler}
					/>
					<button type="submit" className={styles.formButton}>
						<img src={plus} className={styles.buttonIcon} />
					</button>
				</div>
			</form>
		</div>
	);
}
