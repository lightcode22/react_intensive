import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationAuthBlock from "./NavigationAuthBlock";
import NavigationCartBlock from "./NavigationCartBlock";
import { RootStateType } from "../../Redux/store";

import styles from "./styles.module.css";

export default function NavigationBar() {
	const cart = useSelector((state: RootStateType) => state.cart);
	const user = useSelector((state: RootStateType) => state.user.username);

	const activeLinkStyle = ({ isActive }: { isActive: boolean }) =>
		isActive ? styles.active : undefined;

	return (
		<nav className={styles.navigationBar}>
			<ul className={styles.navLinks}>
				<li className={styles.navLink}>
					<NavLink to="/" className={activeLinkStyle}>
						Home
					</NavLink>
				</li>
				<li className={styles.navLink}>
					<NavLink to="/about" className={activeLinkStyle}>
						About
					</NavLink>
				</li>
			</ul>

			<div className={styles.navDash}>
				{user && (
					<NavigationCartBlock
						totalQuantity={cart.totalQuantity}
						totalPrice={cart.totalPrice}
					/>
				)}
				<NavigationAuthBlock />
			</div>
		</nav>
	);
}
