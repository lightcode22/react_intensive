import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ImageContainer from "../components/ImageContainer";
import ProductPurchaseBlock from "../components/ProductPurchaseBlock";
import styles from "./styles.module.css";

const PRODUCT_API = "https://fakestoreapi.com/products/";

const calculateQuantity = (rate) => {
	const floored = Math.floor(rate);
	return floored % 2 === 0 ? 0 : floored;
};

export default function Product() {
	const { id } = useParams();

	const [productInfo, setProductInfo] = useState({});
	const [quantity, setQuntity] = useState(1);
	const { setFlashError } = useContext(ShopContext);

	useEffect(() => {
		fetch(PRODUCT_API + id)
			.then((res) => res.json())
			.then((json) => {
				const quantity = calculateQuantity(json.rating.rate);
				setProductInfo({ ...json, quantity });
			})
			.catch((err) => {
				setFlashError(err.message);
			});
	}, [setFlashError, id]);

	const onQuantityInputHandler = (e) => {
		setQuntity(e.target.value);
	};

	const onQuantityBlurHandler = (e) => {
		const { value } = e.target;

		if (value < 1) {
			setQuntity(1);
		}

		if (value > productInfo.quantity) {
			setQuntity(productInfo.quantity);
		}
	};

	return (
		<div className={styles.productBlock}>
			<div className={styles.productImage}>
				<ImageContainer src={productInfo.image} alt={productInfo.title} />
			</div>
			<div className={styles.infoBlock}>
				<h3 className={styles.productTitle}>{productInfo.title}</h3>
				<span className={styles.productPrice}>${productInfo.price}</span>
				<p className={styles.productDescription}>{productInfo.description}</p>
				<div className={styles.purchaseBlock}>
					<span>Осталось в наличии: {productInfo.quantity}</span>

					<span>
						{productInfo.quantity ? (
							<>
								<input
									type="number"
									min={1}
									max={productInfo.quantity}
									onBlur={onQuantityBlurHandler}
									onInput={onQuantityInputHandler}
									value={quantity}
								/>
								<ProductPurchaseBlock
									productId={productInfo.id}
									productPrice={productInfo.price}
									quantity={quantity}
								/>
							</>
						) : (
							""
						)}
					</span>
				</div>
			</div>
		</div>
	);
}
