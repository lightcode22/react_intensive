import React from "react";
import styles from "../form.module.css";

type ButtonProps = {
	text: string;
	type: "submit" | "reset";
};

export default function FormButton({ text, type }: ButtonProps) {
	const buttonType =
		type === "submit" ? styles.buttonSubmit : styles.buttonReset;

	return (
		<button type={type} className={`${styles.button} ${buttonType}`}>
			{text}
		</button>
	);
}
