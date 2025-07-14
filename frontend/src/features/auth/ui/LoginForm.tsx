import type React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../model/store";
import styles from "../../../pages/auth/ui/auth.module.scss";

interface LoginFields {
	email: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const { register, handleSubmit } = useForm<LoginFields>();
	const { login, loading, error } = useAuthStore();

	const onSubmit = async (data: LoginFields): Promise<void> => {
		await login(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input
				placeholder="Email"
				type="email"
				{...register("email", { required: true })}
				className={styles.input}
			/>
			<input
				placeholder="Пароль"
				type="password"
				{...register("password", { required: true })}
				className={styles.input}
			/>
			{error && <div className={styles.error}>{error}</div>}
			<button className={styles.btn} disabled={loading} type="submit">
				Войти
			</button>
		</form>
	);
};
