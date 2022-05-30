import React from "react";
import styles from "../form.module.css";

type InputProps = {
	labelText: string;
	name: string;
	value: string;
	errorMessage: string;
	onInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlurHandler?: (e: React.FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
	maxLength?: number;
};

class FormInput extends React.Component<InputProps> {
	render() {
		return (
			<div className={styles.formSubBlock}>
				<label className={styles.label}>{this.props.labelText}</label>
				<div className={styles.inputBlock}>
					<input
						type="text"
						name={this.props.name}
						className={styles.input}
						placeholder={this.props.placeholder || this.props.labelText}
						value={this.props.value}
						onInput={this.props.onInputHandler}
						{...(this.props.maxLength
							? { maxLength: this.props.maxLength }
							: {})}
						{...(this.props.onBlurHandler
							? { onBlur: this.props.onBlurHandler }
							: {})}
					/>
					<p className={styles.errorMessage}>{this.props.errorMessage}</p>
				</div>
			</div>
		);
	}
}

export default FormInput;
