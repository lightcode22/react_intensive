import React from "react";
import { Link } from "react-router-dom";
import cartIcon from "../../cart-icon.svg";
import styles from "./styles.module.css";

export default function NavigationCartBlock(props) {
	const { cart } = props;

	// let totalQuantity = 0;
	// let totalPrice = 0;

	// for (let id in cart) {
	// 	const item = cart[id];

	// 	totalQuantity += item.quantity;
	// 	totalPrice += item.quantity * item.price;
	// }

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
