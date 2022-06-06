import React from "react";
import styles from "./styles.module.css";

export default function Button(props) {
	const { children, onClick } = props;

	return (
		<button type="button" className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
}
