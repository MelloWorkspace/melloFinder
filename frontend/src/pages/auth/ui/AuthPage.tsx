import type React from "react";
import { useState } from "react";
import cn from "classnames";
import { LoginForm } from "../../../features/auth/ui/LoginForm";
import { RegisterForm } from "../../../features/register/ui/RegisterForm";
import styles from "./auth.module.scss";

// const loginSchema = z.object({
//   email: z.string().email('Неверный формат email').nonempty('Email обязателен'),
//   password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
// });

// const registerSchema = z.object({
//   name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
//   email: z.string().email('Неверный формат email').nonempty('Email обязателен'),
//   password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: 'Пароли не совпадают',
//   path: ['confirmPassword'],
// });

const AuthPage: React.FC = () => {
	const [tab, setTab] = useState<"login" | "register">("login");

	return (
		<div className={cn(styles.wrapper)}>
			<div className={cn(styles.authSide)}>
				<div className={styles.authRoot}>
					<div className={styles.card}>
						<div className={styles.tabs}>
							<button
								className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
								onClick={() => setTab("login")}
							>
								Вход
							</button>
							<button
								className={`${styles.tab} ${tab === "register" ? styles.active : ""}`}
								onClick={() => setTab("register")}
							>
								Регистрация
							</button>
						</div>
						{tab === "login" ? <LoginForm /> : <RegisterForm />}
					</div>
				</div>
			</div>
			<div className={cn(styles.logoSide)}>
				<div className={cn(styles.logoWrapper)}>
					<span className={cn(styles.logoTitle)}>Mello finder.</span>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
