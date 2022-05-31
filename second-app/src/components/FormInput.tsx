import React from "react";
import styles from "../form.module.css";

type InputProps = {
	labelText: string;
	name: string;
	value: string;
	errorMessage: string;
	placeholder?: string;
	maxLength?: number;
	onInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

class FormInput extends React.Component<InputProps> {
	render() {
		const {
			labelText,
			placeholder,
			maxLength,
			errorMessage,
			value,
			name,
			onBlurHandler,
			onInputHandler,
		} = this.props;

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
}

export default FormInput;
