import styles from "./styles.module.css";

export default function PurchaseBlock({ totalPrice }) {
	return (
		<div className={styles.cartPurchaseBlock}>
			<span className={styles.totalInfo}>Итого: ${totalPrice}</span>

			<button
				type="button"
				disabled
				className={`${styles.button} ${styles.buttonGreen}`}
			>
				Оплатить
			</button>
		</div>
	);
}
