import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import Filters from "./components/Filters";
import TaskSection from "./components/TaskSection";
import FlashErrorModal from "./components/Modals/flashErrorModal";
import RemoveTaskModal from "./components/Modals/removeTaskModal";

function App() {
	return (
		<Provider store={store}>
			<div className="container">
				<NewTaskForm />
				<Filters />
				<TaskSection />
			</div>
			<RemoveTaskModal />
			<FlashErrorModal />
		</Provider>
	);
}

export default App;
