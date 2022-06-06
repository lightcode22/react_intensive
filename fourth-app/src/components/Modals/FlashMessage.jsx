import { useEffect, useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";

export default function FlashMessage({ errorText }) {
	const { setFlashError } = useContext(ShopContext);

	useEffect(() => {
		// 5 секунд вместо 15 для экономии времени
		const closeTimer = setTimeout(() => setFlashError(""), 5000);

		return () => {
			clearTimeout(closeTimer);
		};
	});

	if (errorText === "") return null;

	const onCloseHandler = () => {
		setFlashError("");
	};

	return ReactDOM.createPortal(
		<div className={styles.flashMessage}>
			<div>
				<span className={styles.flashText}>{errorText}</span>
				<button
					type="button"
					className={styles.closeButton}
					onClick={onCloseHandler}
				>
					x
				</button>
			</div>
		</div>,
		document.getElementById("portal-root")
	);
}
