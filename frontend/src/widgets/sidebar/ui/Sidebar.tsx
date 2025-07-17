import cn from "classnames";
import styles from "./sidebar.module.scss";

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
						<svg className={styles.icon} viewBox="0 0 24 24" fill="none">
							<path
								d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<polyline
								points="9,22 9,12 15,12 15,22"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
						<span>Главная</span>
					</div>

					<div className={styles.menuItem}>
						<svg className={styles.icon} viewBox="0 0 24 24" fill="none">
							<path
								d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<polyline
								points="7,10 12,15 17,10"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<line
								x1="12"
								y1="15"
								x2="12"
								y2="3"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
						<span>Экспорт</span>
					</div>

					<div className={styles.menuItem}>
						<svg className={styles.icon} viewBox="0 0 24 24" fill="none">
							<circle
								cx="9"
								cy="21"
								r="1"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<circle
								cx="20"
								cy="21"
								r="1"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
						<span>Корзина</span>
					</div>
				</div>

				{/* Нижняя часть меню */}
				<div className={styles.bottomMenu}>
					<div className={styles.menuItem}>
						<svg className={styles.icon} viewBox="0 0 24 24" fill="none">
							<circle
								cx="12"
								cy="12"
								r="3"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path
								d="M12 1v6m0 6v6m11-7h-6m-6 0H1"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
						<span>Настройки</span>
					</div>

					<div className={styles.menuItem}>
						<svg className={styles.icon} viewBox="0 0 24 24" fill="none">
							<rect
								x="3"
								y="4"
								width="18"
								height="16"
								rx="2"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<line
								x1="7"
								y1="8"
								x2="17"
								y2="8"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<line
								x1="7"
								y1="12"
								x2="17"
								y2="12"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<line
								x1="7"
								y1="16"
								x2="11"
								y2="16"
								stroke="currentColor"
								strokeWidth="2"
							/>
						</svg>
						<span>Тарифы</span>
					</div>
				</div>
			</div>
		</div>
	);
};
