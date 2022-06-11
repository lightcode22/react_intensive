import React from "react";
import ProductCard from "./ProductCard";
import styles from "./homepage.module.css";

export default function ProductsSection({ products }) {
	return (
		<section className={styles.productsSection}>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</section>
	);
}
