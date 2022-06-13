import styles from "./popupOverlay.module.css";

export default function PopupOverlay({
	isOpen,
	onOverlayClickHandler,
}: {
	isOpen: boolean;
	onOverlayClickHandler: () => void;
}) {
	if (!isOpen) return null;

	return <div className={styles.overlay} onClick={onOverlayClickHandler}></div>;
}
