import { FormControlLabel } from "@mui/material";
import type { FormEvent } from "react";
import { type FC, memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getLoginPageRoute } from "../../../../shared/constants";
import { Button, Checkbox, Input, Typography } from "../../../../shared/ui";
import {
	getAuthActions,
	getAuthError,
	getAuthLoading,
	getInviteToken,
} from "../../model/store/store";
import type { SendInviteParameters } from "../../model/types/types";

import styles from "./SignUpForm.module.scss";

interface Props {
	className?: string;
}

interface FormState extends SendInviteParameters {
	agreement: boolean;
}

const SignUpForm: FC<Props> = ({ className }) => {
	const [form, setForm] = useState<FormState>({
		email: "",
		password: "",
		first_name: "",
		last_name: "",
		agreement: false,
	});

	const [step, setStep] = useState<"invite" | "success">("invite");

	const { email, password, first_name, last_name, agreement } = form;
	const { sendInvite, clearError } = getAuthActions();
	const loading = getAuthLoading();
	const error = getAuthError();
	const inviteToken = getInviteToken();
	const navigate = useNavigate();

	useEffect(() => {
		if (inviteToken) {
			setStep("success");
		}
	}, [inviteToken]);

	useEffect(() => {
		return () => {
			clearError();
		};
	}, [clearError]);

	const createChangeHandler = (changed: keyof FormState) => {
		return <T,>(value: T) => {
			setForm({ ...form, [changed]: value });
		};
	};

	const onChangeEmail = createChangeHandler("email");
	const onChangePassword = createChangeHandler("password");
	const onChangeFirstName = createChangeHandler("first_name");
	const onChangeLastName = createChangeHandler("last_name");
	const onChangeCheckbox = createChangeHandler("agreement");

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!agreement) {
			return;
		}

		try {
			await sendInvite({
				email,
				password,
				first_name,
				last_name,
			});
		} catch (error) {
			// Ошибка уже обработана в store
		}
	};

	const handleBackToLogin = () => {
		navigate(getLoginPageRoute());
	};

	if (step === "success") {
		return (
			<div className={className}>
				<h1 className={styles.title}>Приглашение отправлено</h1>
				<Typography.Body className={styles.successMessage}>
					Мы отправили вам приглашение на email: {email}
				</Typography.Body>
				<Typography.Caption className={styles.text}>
					Проверьте почту и следуйте инструкциям для завершения регистрации.
				</Typography.Caption>
				<Button className={styles.registerBtn} onClick={handleBackToLogin}>
					Вернуться к входу
				</Button>
			</div>
		);
	}

	return (
		<form className={className} onSubmit={onSubmit}>
			<h1 className={styles.title}>Регистрация</h1>
			<Input
				required
				className={styles.input}
				placeholder="E-mail"
				type="email"
				value={email}
				onChange={onChangeEmail}
			/>
			<Input
				required
				className={styles.input}
				placeholder="Имя"
				value={first_name}
				onChange={onChangeFirstName}
			/>
			<Input
				required
				className={styles.input}
				placeholder="Фамилия"
				value={last_name}
				onChange={onChangeLastName}
			/>
			<Input
				required
				className={styles.input}
				placeholder="Придумайте пароль"
				type="password"
				value={password}
				onChange={onChangePassword}
			/>

			{error && <div className={styles.error}>{error}</div>}

			<FormControlLabel
				className={styles.checkbox}
				control={<Checkbox value={agreement} onChange={onChangeCheckbox} />}
				label="Я согласен с политикой конфиденциальности и правилами использования персональных данных"
			/>

			<Button
				className={styles.registerBtn}
				disabled={loading || !agreement}
				type="submit"
			>
				{loading ? "Отправка..." : "Отправить приглашение"}
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

export default memo(SignUpForm);
