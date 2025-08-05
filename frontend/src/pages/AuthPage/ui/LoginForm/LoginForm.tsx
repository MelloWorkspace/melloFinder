import type { FC } from "react";

import styles from "./LoginForm.module.scss";
import { Input, Button , Typography} from "../../../../shared/ui";
import { Link } from "react-router-dom";
import { getSignUpPageRoute } from "../../../../shared/constants";

interface Props {
	className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => (
	<div className={className}>
		<h1 className={styles.title}>Войти в профиль</h1>
		<Input className={styles.email}  placeholder="E-mail" />
		<Input  className={styles.password} placeholder="Пароль" type="password" />
		<Button className={styles.register}>Войти</Button>
		<div className={styles.additionalInfo}>
			{/* <Link className={styles.link} to='/'>Забыли пароль</Link> */}
			<Typography.Caption className={styles.text}>
				Ещё нет аккаунта?
			</Typography.Caption>
			{'\u00A0'}
			<Link className={styles.link} to={getSignUpPageRoute()}>
				Зарегистрируйтесь
			</Link>
		</div>
	</div>
);
