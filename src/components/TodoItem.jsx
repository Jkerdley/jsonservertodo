import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './TodoItem.module.css';

const API_URL = 'http://localhost:3004/todos';

export const TodoItem = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [todo, setTodo] = useState(null);
	const [loading, setLoading] = useState(true); // Состояние загрузки
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const response = await fetch(`${API_URL}/${id}`);
				if (!response.ok) {
					// Если задача не найдена, устанавливаем состояние ошибки
					setError(true);
					return;
				}
				const data = await response.json();
				setTodo(data);
			} catch (err) {
				console.error('Ошибка при загрузке задачи:', err);
				setError(true); // Устанавливаем состояние ошибки при возникновении исключения
			} finally {
				setLoading(false); // Устанавливаем состояние загрузки в false
			}
		};

		fetchTodo();
	}, [id]);

	const handleDelete = () => {
		fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => navigate('/'));
	};

	const handleEdit = () => {
		const newTitle = prompt('Введите новую задачу', todo.title);
		if (newTitle) {
			fetch(`${API_URL}/${id}`, {
				method: 'PATCH',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({ title: newTitle }),
			}).then(() => {
				setTodo((prev) => ({ ...prev, title: newTitle }));
			});
		}
	};

	if (loading) return <div className={styles.loader}></div>;

	if (error) {
		navigate('/not-found'); // Перенаправляем на страницу 404, если произошла ошибка
		return null; // Возвращаем null, чтобы ничего не рендерить
	}

	return (
		<div className={styles.wrapper}>
			<h2 className={styles.h3header}>{todo.title}</h2>
			<button className={styles.backButton} onClick={() => navigate(-1)}>
				Назад
			</button>
			<button className={styles.button} onClick={handleEdit}>
				Ред.
			</button>
			<button className={styles.deleteButton} onClick={handleDelete}>
				Удалить
			</button>
		</div>
	);
};
