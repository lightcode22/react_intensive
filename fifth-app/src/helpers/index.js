export function getProductById(allProducts, id) {
	return allProducts.find((product) => product.id === Number(id));
}
