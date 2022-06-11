import { combineReducers } from "redux";

import authModal from "./authModalReducer";
import cart from "./cartReducer";
import flashError from "./flashErrorReducer";
import products from "./productsReducer";
import user from "./userReducer";

export default combineReducers({
	authModal,
	cart,
	flashError,
	products,
	user,
});
