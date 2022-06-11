import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Loader from "../components/Loader";
import ProductsSection from "../components/home/ProductsSection";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export default function Home() {
	const [isFetching, setIsFetching] = useState(true);
	const [allProducts, setAllProducts] = useState([]);
	const { setFlashError } = useContext(ShopContext);

	useEffect(() => {
		fetch(PRODUCTS_API_URL)
			.then((res) => res.json())
			.then((json) => {
				setAllProducts(json);
				setIsFetching(false);
			})
			.catch((err) => {
				setFlashError(err.message);
			});
	}, [setFlashError]);

	return (
		<div>
			{isFetching ? <Loader /> : <ProductsSection products={allProducts} />}
		</div>
	);
}
