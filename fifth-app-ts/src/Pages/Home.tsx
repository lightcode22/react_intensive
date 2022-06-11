import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../Redux/actions";
import Loader from "../components/Loader";
import ProductsSection from "../components/home/ProductsSection";
import { RootStateType } from "../Redux/store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export default function Home() {
	const isFetching = useSelector(
		(state: RootStateType) => state.products.isFetching
	);
	const allProducts = useSelector(
		(state: RootStateType) => state.products.allProducts
	);
	const dispatch = useDispatch();

	// fetch products from server ONLY if NOT fething at the moment
	// to prevent infinite loop
	if (Object.keys(allProducts).length === 0 && !isFetching) {
		(dispatch as ThunkDispatch<RootStateType, unknown, AnyAction>)(
			fetchAllProducts()
		);
	}

	return (
		<div>
			{isFetching ? <Loader /> : <ProductsSection products={allProducts} />}
		</div>
	);
}
