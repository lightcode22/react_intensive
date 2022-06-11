export const fetchAllProducts = () => (dispatch) => {
	dispatch({ type: "fetching_started" });

	fetch("https://fakestoreapi.com/products")
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
