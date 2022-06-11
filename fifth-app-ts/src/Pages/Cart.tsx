import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import CartHeader from "../components/cart/CartHeader";
import PurchaseBlock from "../components/cart/PurchaseBlock";
import { RootStateType } from "../Redux/store";

export default function Cart() {
	const cart = useSelector((state: RootStateType) => state.cart);

	return (
		<>
			<CartHeader />

			{Object.keys(cart.cartItems).map((productId) => (
				<CartItem id={Number(productId)} key={productId} />
			))}

			<PurchaseBlock totalPrice={cart.totalPrice} />
		</>
	);
}
