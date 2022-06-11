const intitialState = {
	cartItems: {},
	totalQuantity: 0,
	totalPrice: 0,
};

export default function cartReducer(state = intitialState, action) {
	if (action.type === "add_to_cart") {
		// if such item is already in the cart -> then increase quantity
		if (action.id in state.cartItems) {
			const price = state.cartItems[action.id].price;

			return {
				...state,
				cartItems: {
					...state.cartItems,
					[action.id]: {
						price: price,
						quantity: state.cartItems[action.id].quantity + action.quantity,
					},
				},
				totalQuantity: state.totalQuantity + action.quantity,
				totalPrice: Number(
					(state.totalPrice + price * action.quantity).toFixed(2)
				),
			};
		}

		return {
			...state,

			cartItems: {
				...state.cartItems,
				[action.id]: {
					price: action.price,
					quantity: action.quantity,
				},
			},
			totalQuantity: state.totalQuantity + action.quantity,
			totalPrice: Number(
				(state.totalPrice + action.price * action.quantity).toFixed(2)
			),
		};
	}

	if (action.type === "remove_one_from_cart") {
		return {
			...state,
			cartItems: {
				...state.cartItems,
				[action.id]: {
					...state.cartItems[action.id],
					quantity: state.cartItems[action.id].quantity - 1,
				},
			},
			totalQuantity: state.totalQuantity - 1,
			totalPrice: Number(
				(state.totalPrice - state.cartItems[action.id].price).toFixed(2)
			),
		};
	}

	if (action.type === "remove_from_cart") {
		const cart = { ...state };

		const { price, quantity } = state.cartItems[action.id];

		cart.totalQuantity -= quantity;
		cart.totalPrice = Number((cart.totalPrice - quantity * price).toFixed(2));

		delete cart.cartItems[action.id];
		return cart;
	}

	if (action.type === "reset_cart") {
		return intitialState;
	}

	return state;
}
