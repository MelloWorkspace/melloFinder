import { memo, useState, type FC } from "react";
import { Checkbox as MCheckbox, type CheckboxProps } from "@mui/material";
import Check from "../../assets/icons/Check.svg";

import cn from "classnames";

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
