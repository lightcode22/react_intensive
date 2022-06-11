import React, { useState } from "react";
import { RootStateType } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.css";

const USER_API_URL = "https://fakestoreapi.com/users/1";

export default function AuthModal() {
	const isOpen = useSelector(
		(state: RootStateType) => state.authModal.isAuthModalOpen
	);
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const [formError, setFormError] = useState("");

	if (!isOpen) return null;

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFormError("");

		try {
			// имитация запроса к БД
			const response = await fetch(USER_API_URL);

			const { username, password } = await response.json();

			const formFields = Object.fromEntries(
				new FormData(e.target as HTMLFormElement)
			);

			console.log(formFields);

			// имитация проверки пары логин/пароль
			if (formFields.login === username && formFields.password === password) {
				dispatch({ type: "login", username });
				dispatch({ type: "close_auth_modal" });

				navigate("/");
			} else {
				setFormError("неверная пара логин/пароль");
			}
		} catch (err) {
			dispatch({ type: "set_flash_error", message: (err as Error).message });
			dispatch({ type: "close_auth_modal" });
		}
	};

	const onModalCloseHandler = () => {
		dispatch({ type: "close_auth_modal" });
	};

	return (
		<>
			<div className={styles.overlay}></div>
			<div className={styles.modalWindow}>
				<div className={styles.modalHeading}>
					<span>Авторизация</span>
					<button
						type="button"
						className={styles.closeButton}
						onClick={onModalCloseHandler}
					>
						x
					</button>
				</div>
				<form onSubmit={onSubmitHandler}>
					<label>
						<span className={styles.modalLabel}>Логин: </span>johnd
						<input
							className={styles.modalInput}
							type="text"
							name="login"
							defaultValue="johnd"
						/>
					</label>

					<label>
						<span className={styles.modalLabel}>Пароль: </span>m38rmF$
						<input
							className={styles.modalInput}
							type="password"
							name="password"
							defaultValue="m38rmF$"
						/>
					</label>

					<p className={styles.fromErrorMessage}>{formError}</p>

					<div className={styles.formButtonsBlock}>
						<button
							className={styles.formButton}
							type="button"
							onClick={onModalCloseHandler}
						>
							Отмена
						</button>
						<button className={styles.formButton} type="submit">
							Войти
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
