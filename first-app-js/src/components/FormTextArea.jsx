import React from "react";
import styles from "../form.module.css";

class FormTextArea extends React.Component {
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
