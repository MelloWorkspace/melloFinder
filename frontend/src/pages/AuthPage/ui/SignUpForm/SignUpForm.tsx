import type { FC } from "react";

import styles from "./SignUpForm.module.scss";
import { Input } from "../../../../shared/ui/Input/Input";
import { Button } from "../../../../shared/ui/Button/Button";
import { Checkbox } from "../../../../shared/ui/Checkbox/Checkbox";
import { FormControlLabel } from "@mui/material";

interface Props {
	className?: string;
}

export const SignUpForm: FC<Props> = ({ className }) => (
	<div className={className}>
		<h1 className={styles.title}>Регистрация</h1>
		<Input placeholder="E-mail" />
		<Input placeholder="Телефон" />
		<Input placeholder="Имя пользователя" />
		<Input placeholder="Придумайте пароль" type="password" />
		<FormControlLabel
			control={<Checkbox />}
			label="Я согласен с политикой конфиденциальности и правилами использования персональных данных"
		/>
		<Button>Зарегистрироваться</Button>
		{/* <span>Забыли пароль</span>
    <span>Ещё нет аккаунта?</span>
    <span>Зарегистрируйтесь</span> */}
	</div>
);
