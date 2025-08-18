import { FormControlLabel } from "@mui/material";
import type { FormEvent } from "react";
import { type FC, useState } from "react";
import { Link } from "react-router-dom";

import { getLoginPageRoute } from "../../../../shared/constants";
import { Button, Checkbox, Input, Typography } from "../../../../shared/ui";
import { getAuthActions } from "../../model/store/store";
import type { RegisterParameters } from "../../model/types/types";

import styles from "./SignUpForm.module.scss";

interface Props {
	className?: string;
}

interface FormState extends RegisterParameters {
	agreement: boolean;
}

export const SignUpForm: FC<Props> = ({ className }) => {
	const [form, setForm] = useState<FormState>({
		email: "",
		password: "",
		name: "",
		phone: "",
		agreement: false,
	});
	const { email, password, name, phone, agreement } = form;

	const { register } = getAuthActions();

	const createChangeHandler = (changed: keyof FormState) => {
		return <T,>(value: T) => {
			setForm({ ...form, [changed]: value });
		};
	};
	const onChangeEmail = createChangeHandler("email");
	const onChangePassword = createChangeHandler("password");
	const onChangeName = createChangeHandler("name");
	const onChangePhone = createChangeHandler("phone");
	const onChangeCheckbox = createChangeHandler("agreement");

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await register(form);
	};

	return (
		<form className={className} onSubmit={onSubmit}>
			<h1 className={styles.title}>Регистрация</h1>
			<Input
				className={styles.email}
				placeholder="E-mail"
				value={email}
				onChange={onChangeEmail}
			/>
			<Input
				className={styles.phone}
				placeholder="Телефон"
				value={phone}
				onChange={onChangePhone}
			/>
			<Input
				className={styles.name}
				placeholder="Имя пользователя"
				value={name}
				onChange={onChangeName}
			/>
			<Input
				className={styles.password}
				placeholder="Придумайте пароль"
				type="password"
				value={password}
				onChange={onChangePassword}
			/>
			<FormControlLabel
				className={styles.checkbox}
				control={<Checkbox value={agreement} onChange={onChangeCheckbox} />}
				label="Я согласен с политикой конфиденциальности и правилами использования персональных данных"
			/>
			<Button className={styles.registerBtn} type="submit">
				Зарегистрироваться
			</Button>
			<div className={styles.additionalInfo}>
				<Typography.Caption className={styles.text}>
					Уже зарегистрированы?
				</Typography.Caption>
				{"\u00A0"}
				<Link className={styles.link} to={getLoginPageRoute()}>
					Войдите в профиль
				</Link>
			</div>
		</form>
	);
};
