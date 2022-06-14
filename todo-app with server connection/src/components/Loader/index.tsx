import spinner from "../../icons/spinner.svg";
import styles from "./loader.module.css";

export default function Loader() {
	return (
		<div className={styles.loader}>
			<img src={spinner} alt="spinner" />
		</div>
	);
}
