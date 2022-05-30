import React from "react";
import styles from "../form.module.css";

type ExtdInputProps = {
	labelText: string;
	errorMessage: string;
	name: string;
	onInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
};

class ExtendedInput extends React.Component<ExtdInputProps> {
	render() {
		return (
			<div className={styles.formSubBlock}>
				<label className={styles.label}>{this.props.labelText}</label>
				<div className={styles.inputBlock}>
					<input
						type="text"
						value={this.props.value}
						name={this.props.name}
						placeholder="7-7777-77-77"
						className={styles.input}
						onInput={this.props.onInputHandler}
						maxLength={12}
					/>
					<p className={styles.errorMessage}>{this.props.errorMessage}</p>
				</div>
			</div>
		);
	}
}

export default ExtendedInput;
