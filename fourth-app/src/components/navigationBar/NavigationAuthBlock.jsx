import React, { useState, useContext } from "react";
import Button from "../Button";
import AuthModal from "../Modals/AuthModal";
import { ShopContext } from "../../Context/ShopContext";

export default function AuthorizationBlock() {
	const { user, setUser } = useContext(ShopContext);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onLoginHandler = () => {
		setIsModalOpen(true);
	};

	const onLogoutHandler = () => {
		setUser(undefined);
	};

	const onModalCloseHandler = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			{user ? (
				<Button onClick={onLogoutHandler}>Выйти</Button>
			) : (
				<>
					<Button onClick={onLoginHandler}>Авторизация</Button>
					<AuthModal isOpen={isModalOpen} onClose={onModalCloseHandler} />
				</>
			)}
		</>
	);
}
