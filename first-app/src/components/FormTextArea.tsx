import React from "react";
import styles from "../form.module.css";

type TextAreaProps = {
	labelText: string;
};

class FormTextArea extends React.Component<TextAreaProps> {
	render() {
		return (
			<>
				<label className={styles.label}>{this.props.labelText}</label>
				<textarea
					className={styles.textarea}
					rows={7}
					placeholder={this.props.labelText}
				/>
			</>
		);
	}
}

export default FormTextArea;
