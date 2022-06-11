import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../helpers";
import QuantityControls from "./QuantityControls";
import { RootStateType } from "../../Redux/store";
import { ProductType } from "../../Pages/Product";
import styles from "./styles.module.css";

export default function CartItem({ id }: { id: number }) {
	const product: ProductType | undefined = useSelector((state: RootStateType) =>
		getProductById(state.products.allProducts, id)
	);

	const quantityInCart = useSelector((state: RootStateType) => {
		return state.cart.cartItems[id].quantity;
	});

	const dispatch = useDispatch();

	return (
		<>
			{product && (
				<div className={styles.cartItem}>
					<div className={styles.cartItemSector}>{id}</div>
					<div className={styles.cartItemSector}>{product.title}</div>
					<div className={styles.cartItemSector}>${product.price}</div>
					<QuantityControls quantity={quantityInCart} id={id} />
					<div className={styles.cartItemSector}>
						${product.price && product.price * quantityInCart}
					</div>
					<div className={styles.cartItemSector}>
						<button
							type="button"
							onClick={() => dispatch({ type: "remove_from_cart", id })}
						>
							Удалить
						</button>
					</div>
				</div>
			)}
		</>
	);
}
