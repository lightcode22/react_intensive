import React from "react";
import { useDispatch } from "react-redux";
import styles from "./styles.module.css";

type PropsType = {
	quantity: number;
	id: number;
};

export default function QuantityControls({ quantity, id }: PropsType) {
	const dispatch = useDispatch();

	const onDecreaseHandler = () => {
		if (quantity > 1) {
			dispatch({ type: "remove_one_from_cart", id });
		} else {
			dispatch({ type: "remove_from_cart", id });
		}
	};

	const onIncreaseHandler = () => {
		dispatch({ type: "add_to_cart", quantity: 1, id });
	};

	return (
		<div className={styles.cartItemSector}>
			<button type="button" onClick={onDecreaseHandler}>
				-
			</button>
			<span className={styles.quantityDisplay}>{quantity}</span>
			<button type="button" onClick={onIncreaseHandler}>
				+
			</button>
		</div>
	);
}
