import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../Redux/actions";
import Loader from "../components/Loader";
import ProductsSection from "../components/home/ProductsSection";
import { useEffect } from "react";

export default function Home() {
	const isFetching = useSelector((state) => state.products.isFetching);
	const allProducts = useSelector((state) => state.products.allProducts);
	const dispatch = useDispatch();

	// fetch products from server ONLY if NOT fething at the moment
	// to prevent infinite loop
	if (Object.keys(allProducts).length === 0 && !isFetching) {
		dispatch(fetchAllProducts());
	}

	return (
		<div>
			{isFetching ? <Loader /> : <ProductsSection products={allProducts} />}
		</div>
	);
}
