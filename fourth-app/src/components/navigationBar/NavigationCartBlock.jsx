import React from "react";
import styles from "./styles.module.css";

export default function NavigationCartBlock(props) {
	const { cart } = props;

	let totalQuantity = 0;
	let totalPrice = 0;

	// const cartItems = Object.keys(cart);

	// if (cartItems.length) {
	// 	console.log("got something in a cart");
	// }

	for (let id in cart) {
		const item = cart[id];

		totalQuantity += item.quantity;
		totalPrice += item.quantity * item.price;
	}

	return (
		<span className={styles.cartItemsInfo}>
			В корзине {totalQuantity} товаров на сумму ${totalPrice}
		</span>
	);
}
