import type { FormEvent } from "react";
import { type FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getSignUpPageRoute } from "../../../../shared/constants";
import { Button, Input, Typography } from "../../../../shared/ui";
import {
	getAuthActions,
	getAuthError,
	getAuthLoading,
	getAuthUser,
} from "../../model/store/store";
import type { LoginParameters } from "../../model/types/types";

import styles from "./LoginForm.module.scss";

interface Props {
	className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => {
	const [form, setForm] = useState<LoginParameters>({
		email: "",
		password: "",
	});

	const { login, clearError } = getAuthActions();
	const loading = getAuthLoading();
	const error = getAuthError();
	const user = getAuthUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			// Перенаправляем на главную страницу после успешного входа
			navigate("/dashboard"); // или куда нужно
		}
	}, [user, navigate]);

	useEffect(() => {
		return () => {
			clearError();
		};
	}, [clearError]);

	const onChangeEmail = (val: string) => {
		setForm({ ...form, email: val });
	};

	const onChangePassword = (val: string) => {
		setForm({ ...form, password: val });
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await login(form);
		} catch (error) {
			// Ошибка уже обработана в store
		}
	};

	return (
		<form className={className} onSubmit={onSubmit}>
			<h1 className={styles.title}>Войти в профиль</h1>
			<Input
				required
				className={styles.input}
				placeholder="E-mail"
				type="email"
				value={form.email}
				onChange={onChangeEmail}
			/>
			<Input
				required
				className={styles.input}
				placeholder="Пароль"
				type="password"
				value={form.password}
				onChange={onChangePassword}
			/>

			{error && <div className={styles.error}>{error}</div>}

			<Button className={styles.loginBtn} disabled={loading} type="submit">
				{loading ? "Вход..." : "Войти"}
			</Button>

			<div className={styles.additionalInfo}>
				<Typography.Caption className={styles.text}>
					Ещё нет аккаунта?
				</Typography.Caption>
				{"\u00A0"}
				<Link className={styles.link} to={getSignUpPageRoute()}>
					Зарегистрируйтесь
				</Link>
			</div>
		</form>
	);
};
