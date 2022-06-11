import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageContainer from "../components/ImageContainer";
import ProductPurchaseBlock from "../components/ProductPurchaseBlock";
import { getProductById } from "../helpers";
import styles from "./styles.module.css";

function calculateQuantity(rate) {
	const floored = Math.floor(rate);
	return floored % 2 === 0 ? 0 : floored;
}

export default function Product() {
	const { id } = useParams();

	const dispatch = useDispatch();

	const [isFetching, setIsFetching] = useState(true);
	const [quantity, setQuantity] = useState(1);

	const thisProduct = useSelector((state) =>
		getProductById(state.products.allProducts, id)
	);

	const [product, setProduct] = useState();

	useEffect(() => {
		if (thisProduct) {
			const quantityInStock = calculateQuantity(thisProduct.rating.rate);
			setProduct({ ...thisProduct, quantityInStock });
			setIsFetching(false);
		} else {
			fetch(`https://fakestoreapi.com/products/${id}`)
				.then((res) => res.json())
				.then((json) => {
					setProduct(json);
					setIsFetching(false);
				})
				.catch((err) => {
					dispatch({ type: "set_flash_error", message: err.message });
				});
		}
	}, []);

	const onQuantityInputHandler = (e) => {
		setQuantity(e.target.value);
	};

	const onQuantityBlurHandler = (e) => {
		const { value } = e.target;

		if (value < 1) {
			setQuantity(1);
		}

		if (value > product.quantityInStock) {
			setQuantity(product.quantityInStock);
		}
	};

	return (
		<div className={styles.productBlock}>
			{isFetching ? (
				"fetching data"
			) : (
				<>
					<div className={styles.productImage}>
						<ImageContainer src={product.image} alt={product.title} />
					</div>
					<div className={styles.infoBlock}>
						<h3 className={styles.productTitle}>{product.title}</h3>
						<span className={styles.productPrice}>${product.price}</span>
						<p className={styles.productDescription}>{product.description}</p>
						<div className={styles.purchaseBlock}>
							<span>Осталось в наличии: {product.quantityInStock}</span>

							<span>
								{product.quantityInStock ? (
									<>
										<input
											type="number"
											min={1}
											max={product.quantityInStock}
											onBlur={onQuantityBlurHandler}
											onInput={onQuantityInputHandler}
											value={quantity}
										/>
										<ProductPurchaseBlock
											productId={product.id}
											productPrice={product.price}
											quantity={quantity}
										/>
									</>
								) : (
									""
								)}
							</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
