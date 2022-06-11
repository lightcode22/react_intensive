import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Loader from "../components/Loader";
import ProductsSection from "../components/home/ProductsSection";

export default function Home() {
	const [isFetching, setIsFetching] = useState(true);
	const [allProducts, setAllProducts] = useState([]);
	const { setFlashError } = useContext(ShopContext);

	useEffect(() => {
		fetch("https://fakestoreapi.com/products")
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
