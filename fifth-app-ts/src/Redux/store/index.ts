import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
