import React from "react";
import styles from "../form.module.css";

type TextAreaProps = {
	labelText: string;
	errorMessage: string;
	onInputHandler: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlurHandler: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	name: string;
	value: string;
};

class FormTextArea extends React.Component<TextAreaProps> {
	render() {
		return (
			<div className={styles.formSubBlock}>
				<label className={styles.label}>{this.props.labelText}</label>
				<div className={styles.inputBlock}>
					<textarea
						className={styles.textarea}
						rows={7}
						placeholder={this.props.labelText}
						onInput={this.props.onInputHandler}
						name={this.props.name}
						maxLength={600}
						value={this.props.value}
						onBlur={this.props.onBlurHandler}
					/>
					<div className={styles.extraInfo}>
						<div className={styles.errorInfo}>{this.props.errorMessage}</div>
						<div className={styles.remainingSymbolsInfo}>
							Осталось {600 - this.props.value.length}/600 символов
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default FormTextArea;
