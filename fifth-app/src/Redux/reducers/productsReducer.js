export default function productsReducer(
	state = { allProducts: [], isFetching: false },
	action
) {
	if (action.type === "cache_products") {
		return {
			...state,
			allProducts: [...action.payload],
		};
	}

	if (action.type === "fetching_started") {
		return {
			...state,
			isFetching: true,
		};
	}

	if (action.type === "fetching_done") {
		return {
			...state,
			isFetching: false,
		};
	}

	return state;
}
