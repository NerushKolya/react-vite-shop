import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="alt" />
			<div className={styles['text']}>Your order has been successfully placed.!</div>
			<Button appearence="big" onClick={() => navigate('/')}>Make a new one</Button>
		</div>
	);
}