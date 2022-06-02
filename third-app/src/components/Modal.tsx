import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

type ModalProps = {
	isOpen: boolean;
	message: string;
	onClose: () => void;
};

export default function Modal({ isOpen, message, onClose }: ModalProps) {
	if (!isOpen) return null;
	return ReactDOM.createPortal(
		<>
			<div className={styles.overlay}></div>
			<div className={styles.modalWindow}>
				<button className={styles.closeButton} onClick={onClose}>
					x
				</button>
				<p className={styles.messageBlock}>{message}</p>
			</div>
		</>,
		document.getElementById("portal-root") as HTMLElement
	);
}
