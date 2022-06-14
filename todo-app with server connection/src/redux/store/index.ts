import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storeReducers from "../reducers";

const store = createStore(storeReducers, applyMiddleware(thunk));

export default store;

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
