import { type InputProps, Input as MInput } from "@mui/material";
import { memo, useCallback, useState, type FC, type ChangeEvent, type ReactNode } from "react";
import cn from "classnames";

import styles from "./Input.module.scss";

interface Props extends Omit<InputProps, "onChange"> {
	className?: string;
	onChange?: (value: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	hint?: ReactNode;
}

export const Input: FC<Props> = memo(
	({ className, error, onFocus, onBlur, onChange, hint, ...otherProps }) => {
		const [focused, setFocused] = useState(false);

		const handleChange = useCallback(
			(e: ChangeEvent<HTMLInputElement>) => {
				onChange?.(e.target.value);
			},
			[onChange]
		);

		const handleFocus = useCallback(() => {
			setFocused(true);
			onFocus?.();
		}, [onFocus]);

		const handleBlur = useCallback(() => {
			setFocused(false);
			onBlur?.();
		}, [onBlur]);

		return (
			<>
			<MInput
				className={cn(styles.input, className, {
					[styles.focus as string]: focused,
					[styles.error as string]: error,
				})}
				onBlur={handleBlur}
				onChange={handleChange}
				onFocus={handleFocus}
				{...otherProps}
			/>
			{hint}
			</>
		);
	}
);
