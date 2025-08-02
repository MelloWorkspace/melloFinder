import type { FC, HTMLAttributes } from "react";
import cn from "classnames";

import styles from "./Typography.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {
	className?: string;
}

export const H1: FC<Props> = ({ children, className }) => {
	return <h1 className={cn(styles.h1, className)}>{children}</h1>;
};

export const H2: FC<Props> = ({ children, className }) => {
	return <h2 className={cn(styles.h2, className)}>{children}</h2>;
};

export const H3: FC<Props> = ({ children, className }) => {
	return <h3 className={cn(styles.h3, className)}>{children}</h3>;
};

export const H4: FC<Props> = ({ children, className }) => {
	return <h4 className={cn(styles.h4, className)}>{children}</h4>;
};

export const Text: FC<Props> = ({ children, className }) => {
	return <span className={cn(styles.text, className)}>{children}</span>;
};

export const SubText: FC<Props> = ({ children, className }) => {
	return <span className={cn(styles.subText, className)}>{children}</span>;
};

export const Caption: FC<Props> = ({ children, className }) => {
	return <span className={cn(styles.caption, className)}>{children}</span>;
};

export const Label: FC<Props> = ({ children, className }) => {
	return <span className={cn(styles.label, className)}>{children}</span>;
};
