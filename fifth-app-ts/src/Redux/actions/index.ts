import { DispatchType } from "../store";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

export const fetchAllProducts = () => (dispatch: DispatchType) => {
	dispatch({ type: "fetching_started" });

	fetch(PRODUCTS_API_URL)
		.then((res) => res.json())
		.then((json) => {
			dispatch({ type: "cache_products", payload: json });
			dispatch({ type: "fetching_done" });
		})
		.catch((err) => {
			dispatch({ type: "fetching_done" });
			dispatch({ type: "set_flash_error", message: err.message });
		});
};
