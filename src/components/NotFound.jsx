import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={styles.title}>404 - Страница не найдена</h1>
			<p className={styles.message}>К сожалению, запрашиваемая страница не существует.</p>
			<Link to="/">
				<button className={styles.backButton}>На главную</button>
			</Link>
		</div>
	);
};

export default NotFound;
