import React from "react";
import { useDispatch } from "react-redux";
import styles from "./filterButton.module.css";

type PropsType = {
	children: React.ReactNode;
	filter: string;
};

export default function FilterButton({ children, filter }: PropsType) {
	const dispatch = useDispatch();

	const onClickHandler = () => {
		dispatch({ type: "set_filter", filter });
	};

	return (
		<div
			className={`${styles.filterButton} ${styles[filter]}`}
			onClick={onClickHandler}
		>
			{children}
		</div>
	);
}
