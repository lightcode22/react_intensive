import React from "react";
import styles from "../form.module.css";

class FormButton extends React.Component {
	render() {
		const buttonType =
			this.props.type === "submit" ? styles.buttonSubmit : styles.buttonReset;

		return (
			<button
				type={this.props.type}
				className={`${styles.button} ${buttonType}`}
			>
				{this.props.text}
			</button>
		);
	}
}

export default FormButton;
