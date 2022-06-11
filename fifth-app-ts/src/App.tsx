import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.css";
import Home from "./Pages/Home";
import AboutCompany from "./Pages/AboutCompany";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import ErrorPage from "./Pages/ErrorPage";
import Layout from "./components/Layout";

function App() {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />}></Route>
						<Route path="about" element={<AboutCompany />}></Route>
						<Route path="cart" element={<Cart />}></Route>
						<Route path="products/:id" element={<Product />}></Route>
						<Route path="*" element={<ErrorPage />} />
					</Route>
				</Routes>
			</Provider>
		</BrowserRouter>
	);
}

export default App;
