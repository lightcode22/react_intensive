import { ProductType } from "../Pages/Product";

export function getProductById(allProducts: ProductType[], id: number) {
	return allProducts.find((product: ProductType) => product.id === Number(id));
}
