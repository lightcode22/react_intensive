import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./Context/ShopContext";
import "./App.css";
import Home from "./Pages/Home";
import AboutCompany from "./Pages/AboutCompany";
import Product from "./Pages/Product";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./components/Layout";

function App() {
	return (
		<BrowserRouter>
			<ShopProvider>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />}></Route>
						<Route path="about" element={<AboutCompany />}></Route>
						<Route path="products/:id" element={<Product />}></Route>
						<Route path="*" element={<ErrorPage />} />
					</Route>
				</Routes>
			</ShopProvider>
		</BrowserRouter>
	);
}

export default App;
