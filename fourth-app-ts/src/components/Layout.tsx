import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Outlet } from "react-router-dom";
import NavigationBar from "./navigationBar/NavigationBar";
import FlashMessage from "./Modals/FlashMessage";
import styles from "./styles.module.css";

export default function Layout() {
	const { flashError } = useContext(ShopContext);
	return (
		<>
			<NavigationBar />
			<div className={styles.container}>
				<Outlet />
				<FlashMessage errorText={flashError} />
			</div>
		</>
	);
}
