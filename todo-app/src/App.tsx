import store from "./Redux/store";
import { Provider } from "react-redux";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import Filters from "./components/Filters";
import TaskSection from "./components/TaskSection";
import FlashErrorModal from "./components/Modals/flashErrorModal";
import TaskActionModal from "./components/Modals/taskActionModal";

function App() {
	return (
		<Provider store={store}>
			<div className="container">
				<NewTaskForm />
				<Filters />
				<TaskSection />
			</div>
			<TaskActionModal />
			<FlashErrorModal />
		</Provider>
	);
}

export default App;
