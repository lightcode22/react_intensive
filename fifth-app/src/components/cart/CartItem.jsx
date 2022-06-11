import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../helpers";
import QuantityControls from "./QuantityControls";
import styles from "./styles.module.css";

export default function CartItem({ id }) {
	const product = useSelector((state) =>
		getProductById(state.products.allProducts, id)
	);

	const quantityInCart = useSelector((state) => {
		return state.cart.cartItems[id].quantity;
	});

	const dispatch = useDispatch();

	return (
		<div className={styles.cartItem}>
			<div className={styles.cartItemSector}>{id}</div>
			<div className={styles.cartItemSector}>{product.title}</div>
			<div className={styles.cartItemSector}>${product.price}</div>
			<QuantityControls quantity={quantityInCart} id={id} />
			<div className={styles.cartItemSector}>
				${product.price * quantityInCart}
			</div>
			<div className={styles.cartItemSector}>
				<button
					type="button>"
					onClick={() => dispatch({ type: "remove_from_cart", id })}
				>
					Удалить
				</button>
			</div>
		</div>
	);
}
