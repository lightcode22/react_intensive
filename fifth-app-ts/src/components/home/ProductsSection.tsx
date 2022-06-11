import ProductCard from "./ProductCard";
import styles from "./homepage.module.css";
import { ProductType } from "../../Pages/Product";

export default function ProductsSection({
	products,
}: {
	products: ProductType[];
}) {
	return (
		<section className={styles.productsSection}>
			{products.map((product) => (
				<ProductCard product={product} key={product.id} />
			))}
		</section>
	);
}
