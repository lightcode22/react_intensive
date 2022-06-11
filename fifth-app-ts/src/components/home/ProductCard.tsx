import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductType } from "../../Pages/Product";
import ImageContainer from "../ImageContainer";
import ProductPurchaseBlock from "../ProductPurchaseBlock";
import styles from "./homepage.module.css";

// наличие товара в магазине зависит от первой цифры в числе,
// которое показывает рейтинг текущего товара
// нечетное - есть в наличии, иначе - отсутствует
const isInStock = (rating: number) => Math.floor(rating) % 2 === 1;

export default function ProductCard({ product }: { product: ProductType }) {
	useEffect(() => {}, []);

	return (
		<div className={styles.productCard}>
			<div className={styles.productImage}>
				<ImageContainer src={product.image} alt={product.title} />
			</div>

			<div className={styles.productInfoBlock}>
				<Link to={`/products/${product.id}`}>
					<span className={styles.productTitle}>{product.title}</span>
				</Link>
				<div className={styles.cardPurchaseBlock}>
					<div className={styles.productPrice}>{product.price}$</div>
					{product.rating && isInStock(product.rating.rate) ? (
						<ProductPurchaseBlock
							productId={product.id}
							productPrice={product.price}
						/>
					) : (
						<span className={styles.outOfStock}>Нет в наличии</span>
					)}
				</div>
			</div>
		</div>
	);
}
