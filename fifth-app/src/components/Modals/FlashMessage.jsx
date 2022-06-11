import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";

export default function FlashMessage() {
	const errorMessage = useSelector((state) => state.flashError.errorMessage);
	const dispatch = useDispatch();

	useEffect(() => {
		// 5 секунд вместо 15 для экономии времени
		const closeTimer = setTimeout(
			() => dispatch({ type: "clear_flash_error" }),
			5000
		);

		return () => {
			clearTimeout(closeTimer);
		};
	});

	if (errorMessage === null) return null;

	const onCloseHandler = () => {
		dispatch({ type: "clear_flash_error" });
	};

	return (
		<div className={styles.flashMessage}>
			<div>
				<span className={styles.flashText}>{errorMessage}</span>
				<button
					type="button"
					className={styles.closeButton}
					onClick={onCloseHandler}
				>
					x
				</button>
			</div>
		</div>
	);
}
