import cn from "classnames";
import type { ReactNode } from "react";

import { ExportIcon, HomeIcon, TrashIcon } from "../../../shared/assets";
import { Icon, Typography } from "../../../shared/ui";

import styles from "./Sidebar.module.scss";

interface SidebarProps {
	classes?: string;
}

interface TopMenuItem {
	icon: ReactNode;
	title: string;
}

interface BottomMenuItem {
	title: string;
}

const topMenuItems: Array<TopMenuItem> = [
	{ icon: <HomeIcon />, title: "Главная" },
	{ icon: <ExportIcon />, title: "Экспорт" },
	{ icon: <TrashIcon />, title: "Корзина" },
];

const bottomMenuItems: Array<BottomMenuItem> = [
	{ title: "Настройки" },
	{ title: "Тарифы" },
];

export const Sidebar: React.FC<SidebarProps> = ({ classes }) => {
	return (
		<div className={cn(styles.sidebarLayout, classes)}>
			<div className={styles.sidebarContainer}>
				{/* Верхняя часть меню */}
				<div className={styles.topMenu}>
					{topMenuItems.map(({ icon, title }) => (
						<div className={styles.menuItem}>
							<Icon className={styles.icon} icon={icon} />
							<Typography.H4>{title}</Typography.H4>
						</div>
					))}
				</div>

				{/* Нижняя часть меню */}
				<div className={styles.bottomMenu}>
					{bottomMenuItems.map(({ title }) => (
						<div className={styles.menuItem}>
							<Typography.Caption>{title}</Typography.Caption>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
