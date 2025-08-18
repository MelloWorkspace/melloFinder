import { type CheckboxProps, Checkbox as MCheckbox } from "@mui/material";
import cn from "classnames";
import { type FC, memo, useState } from "react";

import Check from "../../assets/icons/Check.svg";

import styles from "./Checkbox.module.scss";

interface Props extends CheckboxProps {
	className?: string;
}

export const Checkbox: FC<Props> = memo(
	({ defaultChecked, disabled, ...otherProps }) => {
		const [isCheck, setIsCheck] = useState(defaultChecked);

		const handleChange = () => {
			setIsCheck(!isCheck);
		};

		return (
			<MCheckbox
				checked={defaultChecked}
				disabled={disabled}
				checkedIcon={
					<span className={styles.icon}>
						<Check />
					</span>
				}
				className={cn(styles.checkbox, {
					[styles.checked as string]: isCheck,
					[styles.disabled as string]: disabled,
				})}
				onChange={handleChange}
				{...otherProps}
			/>
		);
	}
);
