import React, { useState, createContext } from "react";

export const ShopContext = createContext();

export default function ShopProvider(props) {
	const [user, setUser] = useState();
	const [cart, setCart] = useState({});
	const [flashError, setFlashError] = useState("");

	return (
		<ShopContext.Provider
			value={{ user, setUser, cart, setCart, flashError, setFlashError }}
		>
			{props.children}
		</ShopContext.Provider>
	);
}
