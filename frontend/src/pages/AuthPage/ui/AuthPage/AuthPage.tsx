import type { FC } from "react";

import { LogoIcon } from "../../../../shared/assets";
import { ROUTES } from "../../../../shared/constants";
import { LoginForm } from "../LoginForm/LoginForm";
import { SignUpForm } from "../SignUpForm/SignUpForm";

import styles from "./AuthPage.module.scss";

type RoutesValues = (typeof ROUTES)[keyof typeof ROUTES];
type AuthRouteValue = Extract<RoutesValues, "login" | "signup">;

const AUTH_FORMS: Record<AuthRouteValue, FC> = {
	[ROUTES.LOGIN]: LoginForm,
	[ROUTES.SIGN_UP]: SignUpForm,
};

const isAuthRoute = (s: string): s is AuthRouteValue =>
	s === ROUTES.LOGIN || s === ROUTES.SIGN_UP;

const AuthPage: FC = () => {
	const path = window.location.pathname.slice(1);
	const Form = isAuthRoute(path) ? AUTH_FORMS[path] : LoginForm;

	return (
		<div className={styles.wrap}>
			<main className={styles.main}>
				<Form className={styles.authCard} />
				<div>
					<span className={styles.logo}>
						<LogoIcon />
					</span>
					<div className={styles.line} />
					<span className={styles.description}>Ваш сервис «со связями»</span>
				</div>
			</main>
		</div>
	);
};

export default AuthPage;
