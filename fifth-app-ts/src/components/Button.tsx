import React from "react";
import styles from "./styles.module.css";

type PropsType = {
	children: React.ReactNode;
	onClick: () => void;
};

export default function Button({ children, onClick }: PropsType) {
	return (
		<button type="button" className={styles.button} onClick={onClick}>
			{children}
		</button>
	);
}
