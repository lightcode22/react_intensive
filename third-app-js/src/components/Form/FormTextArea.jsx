import React from "react";
import styles from "./formComponents.module.css";

export default function FormTextArea(props) {
	const {
		errorMessage,
		labelText,
		name,
		value,
		onBlurHandler,
		onInputHandler,
	} = props;

	return (
		<div className={styles.formSubBlock}>
			<label className={styles.label}>{labelText}</label>
			<div className={styles.inputBlock}>
				<textarea
					className={styles.textarea}
					rows={7}
					placeholder={labelText}
					onInput={onInputHandler}
					name={name}
					maxLength={600}
					value={value}
					onBlur={onBlurHandler}
				/>
				<div className={styles.extraInfo}>
					<div className={styles.errorInfo}>{errorMessage}</div>
					<div className={styles.remainingSymbolsInfo}>
						Осталось {600 - value.length}/600 символов
					</div>
				</div>
			</div>
		</div>
	);
}
