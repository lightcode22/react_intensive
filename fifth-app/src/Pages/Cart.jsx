import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import CartHeader from "../components/cart/CartHeader";
import PurchaseBlock from "../components/cart/PurchaseBlock";

export default function Cart() {
	const cart = useSelector((state) => state.cart);

	return (
		<>
			<CartHeader />

			{Object.keys(cart.cartItems).map((productId) => (
				<CartItem id={productId} key={productId} />
			))}

			<PurchaseBlock totalPrice={cart.totalPrice} />
		</>
	);
}
