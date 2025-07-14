import type React from "react";
import { useState } from "react";
import { LoginForm } from "../../../features/auth/ui/LoginForm";
import { RegisterForm } from "../../../features/register/ui/RegisterForm";
import styles from "./auth.module.scss";

export const AuthPage: React.FC = () => {
	const [tab, setTab] = useState<"login" | "register">("login");

	return (
		<div className={styles.authRoot}>
			<div className={styles.card}>
				<div className={styles.tabs}>
					<button
						className={`${styles.tab} ${tab === "login" ? styles.active : ""}`}
						onClick={() => {
							setTab("login");
						}}
					>
						Вход
					</button>
					<button
						className={`${styles.tab} ${tab === "register" ? styles.active : ""}`}
						onClick={() => {
							setTab("register");
						}}
					>
						Регистрация
					</button>
				</div>
				{tab === "login" ? <LoginForm /> : <RegisterForm />}
			</div>
		</div>
	);
};
