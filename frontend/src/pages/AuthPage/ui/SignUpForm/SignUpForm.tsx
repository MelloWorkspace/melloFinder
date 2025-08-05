import type { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./SignUpForm.module.scss";
import { Input, Button, Checkbox, Typography } from "../../../../shared/ui";
import { FormControlLabel } from "@mui/material";
import { getLoginPageRoute } from "../../../../shared/constants";



interface Props {
	className?: string;
}

export const SignUpForm: FC<Props> = ({ className }) => (
	<div className={className}>
		<h1 className={styles.title}>Регистрация</h1>
		<Input className={styles.email} placeholder="E-mail" />
		<Input className={styles.phone} placeholder="Телефон" />
		<Input className={styles.name} placeholder="Имя пользователя" />
		<Input className={styles.password} placeholder="Придумайте пароль" type="password" />
		<FormControlLabel
			className={styles.checkbox}
			control={<Checkbox />}
			label="Я согласен с политикой конфиденциальности и правилами использования персональных данных"
		/>
		<Button className={styles.registerBtn}>Зарегистрироваться</Button>
		<div className={styles.additionalInfo}>
			<Typography.Caption className={styles.text}>
				Уже зарегистрированы?
			</Typography.Caption>
			{'\u00A0'}
			<Link className={styles.link} to={getLoginPageRoute()}>
				Войдите в профиль
			</Link>
		</div>
	</div>
);
