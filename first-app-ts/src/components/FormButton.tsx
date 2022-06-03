import React from "react";
import styles from "../form.module.css";

type ButtonProps = {
	text: string;
	type: "submit" | "reset";
};

class FormButton extends React.Component<ButtonProps> {
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
