import type { FC } from "react";

import styles from "./LoginForm.module.scss";
import { Input, Button } from "../../../../shared/ui";

interface Props {
	className?: string;
}

export const LoginForm: FC<Props> = ({ className }) => (
	<div className={className}>
		<h1 className={styles.title}>Войти в профиль</h1>
		<Input placeholder="E-mail" />
		<Input placeholder="Пароль" type="password" />
		<Button>Зарегистрироваться</Button>
		{/* <span>Забыли пароль</span>
    <span>Ещё нет аккаунта?</span>
    <span>Зарегистрируйтесь</span> */}
	</div>
);
