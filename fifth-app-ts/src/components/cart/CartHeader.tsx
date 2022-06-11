import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

export default function CartHeader() {
	const dispatch = useDispatch();

	return (
		<div className={`${styles.cartItem} ${styles.cartHeader}`}>
			<div className={styles.cartItemSector}>ID</div>
			<div className={styles.cartItemSector}>Наименование товара</div>
			<div className={styles.cartItemSector}>Цена за 1 единицу</div>
			<div className={styles.cartItemSector}>В корзине</div>
			<div className={styles.cartItemSector}>На сумму</div>
			<div>
				<button
					type="button"
					className={`${styles.button} ${styles.buttonRed}`}
					onClick={() => dispatch({ type: "reset_cart" })}
				>
					Очистить корзину
				</button>
			</div>
		</div>
	);
}
