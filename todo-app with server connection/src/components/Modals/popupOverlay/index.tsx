import styles from "./popupOverlay.module.css";

type PropsType = {
	isOpen: boolean;
	onOverlayClickHandler: () => void;
};

export default function PopupOverlay({
	isOpen,
	onOverlayClickHandler,
}: PropsType) {
	if (!isOpen) return null;

	return <div className={styles.overlay} onClick={onOverlayClickHandler}></div>;
}
