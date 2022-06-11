import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ImageContainer from "../components/ImageContainer";
import ProductPurchaseBlock from "../components/ProductPurchaseBlock";
import { getProductById } from "../helpers";
import { RootStateType } from "../Redux/store";
import styles from "./styles.module.css";

export type ProductType = {
	id?: number;
	title?: string;
	price?: number;
	description?: string;
	category?: string;
	image?: string;
	rating?: {
		rate: number;
		count: number;
	};
	quantityInStock?: number;
};

type URLParamsType = {
	id: string;
};

function calculateQuantity(rate: number) {
	const floored = Math.floor(rate);
	return floored % 2 === 0 ? 0 : floored;
}

const PRODUCT_API_URL = "https://fakestoreapi.com/products/";

export default function Product() {
	const { id } = useParams<keyof URLParamsType>() as URLParamsType;

	const dispatch = useDispatch();

	const [isFetching, setIsFetching] = useState(true);
	const [quantity, setQuantity] = useState(1);

	const thisProduct = useSelector((state: RootStateType) =>
		getProductById(state.products.allProducts, Number(id))
	);

	const [product, setProduct] = useState<ProductType>({});

	useEffect(() => {
		if (thisProduct && thisProduct.rating) {
			const quantityInStock = calculateQuantity(thisProduct.rating.rate);
			setProduct({ ...thisProduct, quantityInStock });
			setIsFetching(false);
		} else {
			fetch(PRODUCT_API_URL + id)
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

	const onQuantityInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(Number(e.target.value));
	};

	const onQuantityBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (Number(value) < 1) {
			setQuantity(1);
		}

		if (product.quantityInStock && Number(value) > product.quantityInStock) {
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
