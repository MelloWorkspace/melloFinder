import { type CircularProgressProps, CircularProgress } from "@mui/material";
import {type FC, memo } from "react";
import cn from "classnames";

import styles from "./Loader.module.scss";

interface Props extends CircularProgressProps {
	full?: boolean;
	fullClassName?: string;
	className?: string;
}

export const Loader: FC<Props> = memo(({
	full,
	className,
	fullClassName,
	...otherProps
}) => {
	const LoadingSpin = (
		<CircularProgress
			className={cn(styles.loader, className)}
			{...otherProps}
		/>
	);
	return full ? (
		<div className={cn(styles.full, fullClassName)}>{LoadingSpin}</div>
	) : (
		LoadingSpin
	);
});
