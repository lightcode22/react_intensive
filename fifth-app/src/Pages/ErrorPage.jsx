import React from "react";
import styles from "./styles.module.css";

export default function ErrorPage() {
	return (
		<div className={styles.errorPage}>
			Что-то пошло не так. Данной страницы не существует.
		</div>
	);
}
