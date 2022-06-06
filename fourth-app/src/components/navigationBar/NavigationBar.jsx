import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import NavigationAuthBlock from "./NavigationAuthBlock";
import NavigationCartBlock from "./NavigationCartBlock";

import styles from "./styles.module.css";

export default function NavigationBar() {
	const { cart, user } = useContext(ShopContext);

	const activeLinkStyle = ({ isActive }) =>
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

			<div>
				{user && <NavigationCartBlock cart={cart} />}
				<NavigationAuthBlock />
			</div>
		</nav>
	);
}
