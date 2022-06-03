import React from "react";
import styles from "./formComponents.module.css";

export default function FormButton({ text, type }) {
	const buttonType =
		type === "submit" ? styles.buttonSubmit : styles.buttonReset;

	return (
		<button type={type} className={`${styles.button} ${buttonType}`}>
			{text}
		</button>
	);
}
