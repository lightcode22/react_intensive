import React, { useContext, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Button from "./Button";
import styles from "./styles.module.css";

interface Cart {
	[key: number]: {
		price: number;
		quantity: number;
	};
}

type CartType = Cart | {};

export default function ProductPurchaseBlock(props) {
	const { quantity, productId, productPrice } = props;
	const { user, cart, setCart }: { cart: CartType } = useContext(ShopContext);

	const addToCartHandler = () => {
		let quantityToAdd = 1;

		if (quantity) {
			quantityToAdd = Number(quantity);
		}

		if (productId in cart) {
			setCart((prevState) => ({
				...prevState,
				[productId]: {
					price: productPrice,
					quantity: cart[productId].quantity + quantityToAdd,
				},
			}));
		} else {
			setCart((prevState) => ({
				...prevState,
				[productId]: { price: productPrice, quantity: quantityToAdd },
			}));
		}
	};

	useEffect(() => {
		console.log(cart);
	});

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
