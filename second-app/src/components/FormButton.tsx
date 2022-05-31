import React from "react";
import styles from "../form.module.css";

type ButtonProps = {
	text: string;
	type: "submit" | "reset";
};

class FormButton extends React.Component<ButtonProps> {
	render() {
		const { text, type } = this.props;

		const buttonType =
			type === "submit" ? styles.buttonSubmit : styles.buttonReset;

		return (
			<button type={type} className={`${styles.button} ${buttonType}`}>
				{text}
			</button>
		);
	}
}

export default FormButton;
