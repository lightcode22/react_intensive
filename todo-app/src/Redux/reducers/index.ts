import { combineReducers } from "redux";

import tasks from "./tasksReducer";
import flashError from "./flashErrorReducer";
import taskAction from "./taskActionReducer";

export default combineReducers({
	tasks,
	flashError,
	taskAction,
});
