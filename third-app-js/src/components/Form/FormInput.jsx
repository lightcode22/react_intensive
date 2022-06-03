import React from "react";
import styles from "./formComponents.module.css";

export default function FormInput(props) {
	const {
		errorMessage,
		labelText,
		name,
		maxLength,
		placeholder,
		value,
		onBlurHandler,
		onInputHandler,
	} = props;

	return (
		<div className={styles.formSubBlock}>
			<label className={styles.label}>{labelText}</label>
			<div className={styles.inputBlock}>
				<input
					type="text"
					name={name}
					className={styles.input}
					placeholder={placeholder || labelText}
					value={value}
					onInput={onInputHandler}
					{...(maxLength ? { maxLength: maxLength } : {})}
					{...(onBlurHandler ? { onBlur: onBlurHandler } : {})}
				/>
				<p className={styles.errorMessage}>{errorMessage}</p>
			</div>
		</div>
	);
}
