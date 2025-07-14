import type React from "react";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "../model/store";
import styles from "../../../pages/auth/ui/auth.module.scss";

interface RegisterFields {
	email: string;
	password: string;
	name: string;
}

export const RegisterForm: React.FC = () => {
	const { register, handleSubmit } = useForm<RegisterFields>();
	const { register: registerUser, loading, error } = useRegisterStore();

	const onSubmit = async (data: RegisterFields): Promise<void> => {
		await registerUser(data);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<input
				placeholder="Имя"
				type="text"
				{...register("name", { required: true })}
				className={styles.input}
			/>
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
				Зарегистрироваться
			</button>
		</form>
	);
};
