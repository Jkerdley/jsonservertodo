import { Item } from './Item';
import { useState, useEffect, useCallback } from 'react';
import { debounce } from './Debounce';
import styles from './Todo.module.css';

const API_URL = 'http://localhost:3004/todos';

export const TodoList = () => {
	const [title, setTitle] = useState('');
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchItem, setSearchItem] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState(false);
	const [filteredTodos, setFilteredTodos] = useState([]);

	const loadTodos = useCallback(() => {
		setLoading(true);
		fetch(API_URL)
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		loadTodos();
	}, [loadTodos]);

	const debouncedSearch = useCallback(
		debounce((searchItem) => {
			if (searchItem) {
				const filtered = todos.filter((todo) => todo.title.toLowerCase().includes(searchItem.toLowerCase()));
				setFilteredTodos(filtered);
			} else {
				setFilteredTodos(todos);
			}
		}, 300),
		[todos],
	);

	useEffect(() => {
		debouncedSearch(searchItem);
	}, [searchItem, debouncedSearch]);

	const sortedTodos = sortAlphabetically
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	const requestAddTodo = async () => {
		if (title) {
			await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-type': 'application/json; charset=utf-8' },
				body: JSON.stringify({ title: title, completed: false }),
			});
			loadTodos();
			setTitle('');
		} else {
			alert('Пожалуйста введите текст задачи');
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			requestAddTodo();
		}
	};

	const toggleSortAlphabetically = () => {
		setSortAlphabetically(!sortAlphabetically);
	};

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.searchItem}
				value={searchItem}
				onChange={(event) => setSearchItem(event.target.value)}
				type="text"
				placeholder="Поиск"
				onKeyDown={handleKeyPress}
			/>
			<input
				className={styles.input}
				value={title}
				onChange={(event) => setTitle(event.target.value)}
				type="text"
				placeholder="Введите задачу"
				onKeyDown={handleKeyPress}
			/>
			<button className={styles.button} onClick={requestAddTodo}>
				Добавить
			</button>
			<button onClick={toggleSortAlphabetically} className={styles.alphabetButton}>
				{sortAlphabetically ? 'Сортировать по умолчанию' : 'Сортировать А->Я'}
			</button>
			<ul>
				{loading ? (
					<div className={styles.loader} />
				) : searchItem.trim() !== '' && filteredTodos.length === 0 ? (
					<p className={styles.nothing}>Ничего не найдено</p>
				) : sortedTodos.length > 0 ? (
					sortedTodos.map((todo) => <Item key={todo.id} title={todo.title} id={todo.id} />)
				) : (
					filteredTodos.map((todo) => <Item key={todo.id} title={todo.title} id={todo.id} />)
				)}
			</ul>
		</div>
	);
};
