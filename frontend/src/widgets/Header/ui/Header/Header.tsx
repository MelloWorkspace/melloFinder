import { Avatar } from "@mui/material";
import type { FC } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../../shared/assets/icons/Logo.svg";
import { getMainPageRoute } from "../../../../shared/constants/routes/routes";
import { Caption, H4 } from "../../../../shared/ui/Typography/Typography";

import styles from "./Header.module.scss";

interface Props {
	className?: string;
}

export const Header: FC<Props> = () => (
	<div className={styles.header}>
		<Link to={getMainPageRoute()}>
			<Logo />
		</Link>

		<div className={styles.profile}>
			<Avatar className={styles.avatar} />
			<span className={styles.profileInfo}>
				<H4 className={styles.name}>Елена Головач</H4>
				<Caption className={styles.description}>Личный кабинет</Caption>
			</span>
		</div>
	</div>
);
