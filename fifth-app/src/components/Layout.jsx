import { Outlet } from "react-router-dom";
import NavigationBar from "./navigationBar/NavigationBar";
import AuthModal from "./Modals/AuthModal";
import FlashMessage from "./Modals/FlashMessage";
import styles from "./styles.module.css";

export default function Layout() {
	return (
		<>
			<NavigationBar />
			<div className={styles.container}>
				<Outlet />
			</div>
			<AuthModal />
			<FlashMessage />
		</>
	);
}
