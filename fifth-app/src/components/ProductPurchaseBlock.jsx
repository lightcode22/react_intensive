import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import styles from "./styles.module.css";

export default function ProductPurchaseBlock({
	quantity = 1,
	productId,
	productPrice,
}) {
	const user = useSelector((state) => state.user.username);

	const dispatch = useDispatch();

	const addToCartHandler = () => {
		const quantityToBuy = Number(quantity);

		dispatch({
			type: "add_to_cart",
			id: productId,
			quantity: quantityToBuy,
			price: productPrice,
		});
	};

	return (
		<>
			{user ? (
				<Button onClick={addToCartHandler}>Добавить в корзину</Button>
			) : (
				<span className={styles.needAuthText}>
					Чтобы добавить товар в корзину залогинтесь
				</span>
			)}
		</>
	);
}
