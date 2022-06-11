import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import styles from "./styles.module.css";

const USER_API = "https://fakestoreapi.com/users/1";

export default function AuthModal({ isOpen, onClose }) {
	const { setUser, setFlashError } = useContext(ShopContext);
	const navigate = useNavigate();
	const [formError, setFormError] = useState("");

	if (!isOpen) return null;

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		setFormError("");

		try {
			// имитация запроса к БД
			const response = await fetch(USER_API);

			const { username, password } = await response.json();

			const form = new FormData(e.target);
			const formFields = Object.fromEntries(form);

			// имитация проверки пары логин/пароль
			if (formFields.login === username && formFields.password === password) {
				setUser(username);
				onClose();
				navigate("/");
			} else {
				setFormError("неверная пара логин/пароль");
			}
		} catch (err) {
			setFlashError(err.message);
			onClose();
		}
	};

	return ReactDOM.createPortal(
		<>
			<div className={styles.overlay}></div>
			<div className={styles.modalWindow}>
				<div className={styles.modalHeading}>
					<span>Авторизация</span>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onClose}
					>
						x
					</button>
				</div>
				<form onSubmit={onSubmitHandler}>
					<label>
						<span className={styles.modalLabel}>Логин: </span>johnd
						<input className={styles.modalInput} type="text" name="login" />
					</label>

					<label>
						<span className={styles.modalLabel}>Пароль: </span>m38rmF$
						<input
							className={styles.modalInput}
							type="password"
							name="password"
						/>
					</label>

					<p className={styles.fromErrorMessage}>{formError}</p>

					<div className={styles.formButtonsBlock}>
						<button
							className={styles.formButton}
							type="button"
							onClick={onClose}
						>
							Отмена
						</button>
						<button className={styles.formButton} type="submit">
							Войти
						</button>
					</div>
				</form>
			</div>
		</>,
		document.getElementById("portal-root")
	);
}
