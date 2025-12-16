// src/entities/auth/ui/AcceptInviteForm/AcceptInviteForm.tsx
import type { FormEvent } from "react";
import { type FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getLoginPageRoute } from "../../../../shared/constants";
import { Button, Input, Typography } from "../../../../shared/ui";
import {
	getAuthActions,
	getAuthError,
	getAuthLoading,
	getAuthUser,
} from "../../model/store/store";
import type { AcceptInviteParameters } from "../../model/types/types";

import styles from "./AcceptInviteForm.module.scss";

interface Props {
	className?: string;
}

export const AcceptInviteForm: FC<Props> = ({ className }) => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const navigate = useNavigate();

	const [form, setForm] = useState<Omit<AcceptInviteParameters, "token">>({
		password: "",
		first_name: "",
		last_name: "",
	});

	const { acceptInvite, clearError } = getAuthActions();
	const loading = getAuthLoading();
	const error = getAuthError();
	const user = getAuthUser();

	useEffect(() => {
		if (!token) {
			navigate(getLoginPageRoute());
		}
	}, [token, navigate]);

	useEffect(() => {
		if (user) {
			navigate("/leads"); // FIXME: выцепить роут
		}
	}, [user, navigate]);

	useEffect(() => {
		return () => {
			clearError();
		};
	}, [clearError]);

	const onChangePassword = (val: string) => {
		setForm({ ...form, password: val });
	};

	const onChangeFirstName = (val: string) => {
		setForm({ ...form, first_name: val });
	};

	const onChangeLastName = (val: string) => {
		setForm({ ...form, last_name: val });
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!token) return;

		try {
			await acceptInvite({
				token,
				...form,
			});
		} catch (error) {
			// Ошибка уже обработана в store
		}
	};

	if (!token) {
		return null;
	}

	return (
		<form className={className} onSubmit={onSubmit}>
			<h1 className={styles.title}>Завершение регистрации</h1>
			<Typography.Body className={styles.subtitle}>
				Введите ваши данные для завершения создания аккаунта
			</Typography.Body>

			<Input
				required
				className={styles.input}
				placeholder="Имя"
				value={form.first_name}
				onChange={onChangeFirstName}
			/>
			<Input
				required
				className={styles.input}
				placeholder="Фамилия"
				value={form.last_name}
				onChange={onChangeLastName}
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

			<Button className={styles.submitBtn} disabled={loading} type="submit">
				{loading ? "Создание аккаунта..." : "Создать аккаунт"}
			</Button>
		</form>
	);
};
