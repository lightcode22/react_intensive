import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./taskEditBlock.module.css";

type PropsType = {
	id: number | null;
	title: string;
	onSubmitHander: () => void;
};

export default function TaskEditBlock({
	id,
	title,
	onSubmitHander,
}: PropsType) {
	const [inputText, setInputText] = useState(title);
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
			if (!hasError && inputText.trim() !== "") {
				dispatch({ type: "edit_task", id, title: inputText });
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
