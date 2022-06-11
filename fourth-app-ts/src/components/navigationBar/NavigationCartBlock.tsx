import styles from "./styles.module.css";

export default function NavigationCartBlock({ cart }) {
	let totalQuantity = 0;
	let totalPrice = 0;

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
