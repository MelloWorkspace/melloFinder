import cn from "classnames";
import styles from "./Sidebar.module.scss";
import { Icon } from "../../../shared/ui/Icon/Icon";

import HomeIcon from "../../../shared/assets/icons/Home.svg";
import ExportIcon from "../../../shared/assets/icons/Export.svg";
import TrashIcon from "../../../shared/assets/icons/Trash.svg";

interface SidebarProps {
	classes?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ classes }) => {
	return (
		<div className={cn(styles.sidebarLayout, classes)}>
			<div className={styles.sidebarContainer}>
				{/* Верхняя часть меню */}
				<div className={styles.topMenu}>
					<div className={styles.menuItem}>
						<Icon className={styles.icon} icon={<HomeIcon />} />
						<span>Главная</span>
					</div>

					<div className={styles.menuItem}>
						<Icon className={styles.icon} icon={<ExportIcon />} />
						<span>Экспорт</span>
					</div>

					<div className={styles.menuItem}>
						<Icon className={styles.icon} icon={<TrashIcon />} />
						<span>Корзина</span>
					</div>
				</div>

				{/* Нижняя часть меню */}
				<div className={styles.bottomMenu}>
					<div className={styles.menuItem}>
						<span>Настройки</span>
					</div>

					<div className={styles.menuItem}>
						<span>Тарифы</span>
					</div>
				</div>
			</div>
		</div>
	);
};
