import FilterButton from "./filterButton";
import styles from "./filters.module.css";

export default function Filters() {
	return (
		<div className={styles.filtersBlock}>
			<FilterButton filter="done">Выполненные задачи</FilterButton>
			<FilterButton filter="inProcess">Задачи в работе</FilterButton>
			<FilterButton filter="favourite">Избранные задачи</FilterButton>
		</div>
	);
}
