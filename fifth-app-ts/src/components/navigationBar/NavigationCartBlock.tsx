import { Link } from "react-router-dom";
import { CartStateType } from "../../Redux/reducers/cartReducer";
import cartIcon from "../../cart-icon.svg";
import styles from "./styles.module.css";

type PropsType = {
	totalQuantity: number;
	totalPrice: number;
};

export default function NavigationCartBlock(props: PropsType) {
	return (
		<span className={styles.cartItemsInfo}>
			<Link to="/cart">
				<div className={styles.cartButton}>
					<img src={cartIcon} className={styles.cartIcon} />
				</div>
			</Link>
			В корзине {props.totalQuantity} товаров на сумму ${props.totalPrice}
		</span>
	);
}
