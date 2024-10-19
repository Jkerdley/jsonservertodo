import styles from './Item.module.css';
import { Link } from 'react-router-dom';

export const Item = ({ title, id }) => {
	const cropTitle = title.length > 26 ? title.substring(0, 26) + '...' : title;

	return (
		<li>
			<div className={styles.container}>
				<div className={styles.title}>
					<Link to={`/task/${id}`} className={styles.title}>
						{cropTitle}
					</Link>
				</div>
			</div>
		</li>
	);
};
