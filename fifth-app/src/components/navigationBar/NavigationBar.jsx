import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import NavigationAuthBlock from "./NavigationAuthBlock";
import NavigationCartBlock from "./NavigationCartBlock";

import styles from "./styles.module.css";

export default function NavigationBar() {
	const cart = useSelector((state) => state.cart);
	const user = useSelector((state) => state.user.username);

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

			<div className={styles.navDash}>
				{user && <NavigationCartBlock cart={cart} />}
				<NavigationAuthBlock />
			</div>
		</nav>
	);
}
