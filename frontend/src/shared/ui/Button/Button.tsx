import { type FC, memo } from "react";
import cn from "classnames";
import { type ButtonProps, Button as MButton } from "@mui/material";

import styles from "./Button.module.scss";

interface Props extends ButtonProps {
	className?: string;
}

export const Button: FC<Props> = memo(({ className, ...otherProps }) => (
	<MButton className={cn(styles.btn, className)} {...otherProps} />
));
