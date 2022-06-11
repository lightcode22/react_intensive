import { useSelector, useDispatch } from "react-redux";
import { RootStateType } from "../Redux/store";
import Button from "./Button";
import styles from "./styles.module.css";

type PropsType = {
	productId?: number;
	productPrice?: number;
	quantity?: number;
};

export default function ProductPurchaseBlock({
	quantity = 1,
	productId,
	productPrice,
}: PropsType) {
	const user = useSelector((state: RootStateType) => state.user.username);

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
