import type { FormEvent } from "react";
import { type FC, useState } from "react";
import { Link } from "react-router-dom";

import { getSignUpPageRoute } from "../../../../shared/constants";
import { Button, Input, Typography } from "../../../../shared/ui";
import { getAuthActions, getAuthLoading } from "../../model/store/store";
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

	const { login } = getAuthActions();
	const loading = getAuthLoading();

	const onChangeEmail = (val: string) => {
		setForm({ ...form, email: val });
	};

	const onChangePassword = (val: string) => {
		setForm({ ...form, password: val });
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await login(form);
	};

	return (
		<form className={className} onSubmit={onSubmit}>
			<h1 className={styles.title}>Войти в профиль</h1>
			<Input
				className={styles.email}
				placeholder="E-mail"
				onChange={onChangeEmail}
			/>
			<Input
				className={styles.password}
				placeholder="Пароль"
				onChange={onChangePassword}
			/>
			{/* {error && <div className={styles.error}>{error}</div>} */}
			<Button className={styles.register} disabled={loading} type="submit">
				Войти
			</Button>
			<div className={styles.additionalInfo}>
				{/* <Link className={styles.link} to='/'>Забыли пароль</Link> */}
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
