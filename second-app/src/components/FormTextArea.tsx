import React from "react";
import styles from "../form.module.css";

type TextAreaProps = {
	labelText: string;
	errorMessage: string;
	name: string;
	value: string;
	onInputHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlurHandler: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

class FormTextArea extends React.Component<TextAreaProps> {
	render() {
		const {
			labelText,
			value,
			errorMessage,
			name,
			onInputHandler,
			onBlurHandler,
		} = this.props;

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
}

export default FormTextArea;
