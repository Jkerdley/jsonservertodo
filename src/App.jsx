import { Routes, Route } from 'react-router-dom';
import './App.css';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import NotFound from './components/NotFound';

export const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<TodoList />} />
				<Route path="/task/:id" element={<TodoItem />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};
