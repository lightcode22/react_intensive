import Button from "../Button";
import { RootStateType } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";

export default function AuthorizationBlock() {
	const dispatch = useDispatch();

	const user = useSelector((state: RootStateType) => state.user.username);

	const onLoginHandler = () => {
		dispatch({ type: "open_auth_modal" });
	};

	const onLogoutHandler = () => {
		dispatch({ type: "logout" });
	};

	return (
		<>
			{user ? (
				<Button onClick={onLogoutHandler}>Выйти</Button>
			) : (
				<>
					<Button onClick={onLoginHandler}>Авторизация</Button>
				</>
			)}
		</>
	);
}
