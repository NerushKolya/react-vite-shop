import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Headling from '../../components/Headling/Headling';
import Input from '../../components/Input/Input';
import styles from '../Login/Login.module.css';
import {type FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispath, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';

export type RegisterForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
}

export function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearRegisterError());
		const target = e.target as typeof e.target & RegisterForm;
		const { email, password, name } = target;
		dispatch(register({ email: email.value, password: password.value, name: name.value }));
	};

	return <div className={styles['login']}>
		<Headling>Registration</Headling>
		{registerErrorMessage && <div className={styles['error']}>{registerErrorMessage}</div>}
		<form className={styles['form']} onSubmit={submit}>
			<div className={styles['field']}>
				<label htmlFor="email">Email</label>
				<Input id="email" name='email' placeholder='Email' />
			</div>
			<div className={styles['field']}>
				<label htmlFor="password">Password</label>
				<Input id="password" name='password' type="password" placeholder='Пароль' />
			</div>
			<div className={styles['field']}>
				<label htmlFor="name">Name</label>
				<Input id="name" name='name' placeholder='Имя' />
			</div>
			<Button appearence="big">Register</Button>
		</form>
		<div className={styles['links']}>
			<div>Do you have an account?</div>
			<Link to="/auth/login">Login</Link>
		</div>
	</div>;
}