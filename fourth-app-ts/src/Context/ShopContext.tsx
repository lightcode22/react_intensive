import React, { useState, createContext } from "react";

type Props = {
	children: React.ReactNode;
};

interface Cart {
	[key: number]: {
		price: number;
		quantity: number;
	};
}

type CartType = Cart | {};

export const ShopContext = createContext({});

export const ShopProvider: React.FC<Props> = (props) => {
	const [user, setUser] = useState();
	const [cart, setCart] = useState<CartType>({});
	const [flashError, setFlashError] = useState("");

	return (
		<ShopContext.Provider
			value={{ user, setUser, cart, setCart, flashError, setFlashError }}
		>
			{props.children}
		</ShopContext.Provider>
	);
};
