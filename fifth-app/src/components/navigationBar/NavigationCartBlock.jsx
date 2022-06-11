import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../cart-icon.svg";
import styles from "./styles.module.css";

export default function NavigationCartBlock({ cart }) {
	return (
		<span className={styles.cartItemsInfo}>
			<Link to="/cart">
				<div className={styles.cartButton}>
					<img src={cartIcon} className={styles.cartIcon} />
				</div>
			</Link>
			В корзине {cart.totalQuantity} товаров на сумму ${cart.totalPrice}
		</span>
	);
}
