import React from "react";
import { useLeadsStore } from "../../../features/leads";
import { LeadsFilters } from "../../../features/leads/ui/LeadsFilters"; // FIXME
import styles from "./filters.module.scss";

interface filterProps {
	classses?: string;
}

export const Filters: React.FC<filterProps> = ({ classses }) => {
	const { leads, loading, error, page, pageSize, setPage, fetchLeads } =
		useLeadsStore();

	const handlePrevious = (): void => {
		if (page > 1) {
			setPage(page - 1);
			fetchLeads();
		}
	};

	const handleNext = (): void => {
		if (leads.length === pageSize) {
			setPage(page + 1);
			fetchLeads();
		}
	};

	const getStatusBadge = (status: string) => {
		const statusClasses = {
			active: styles.statusActive,
			pending: styles.statusPending,
			inactive: styles.statusInactive,
		};
		return statusClasses[status.toLowerCase()] || styles.statusDefault;
	};

	return (
		<div className={styles.container}>
			{/* Фильтры */}
			<div className={styles.filtersSection}>
				<div className={styles.filtersHeader}>
					<h2 className={styles.title}>Управление лидами</h2>
					<div className={styles.stats}>
						<span className={styles.statItem}>
							Всего: <strong>{leads.length}</strong>
						</span>
					</div>
				</div>
				<LeadsFilters />
			</div>

			{/* Состояния загрузки и ошибки */}
			{loading && (
				<div className={styles.loadingContainer}>
					<div className={styles.spinner}></div>
					<span>Загрузка данных...</span>
				</div>
			)}

			{error && (
				<div className={styles.errorContainer}>
					<svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none">
						<circle
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<line
							x1="15"
							y1="9"
							x2="9"
							y2="15"
							stroke="currentColor"
							strokeWidth="2"
						/>
						<line
							x1="9"
							y1="9"
							x2="15"
							y2="15"
							stroke="currentColor"
							strokeWidth="2"
						/>
					</svg>
					<span>{error}</span>
				</div>
			)}

			{/* Таблица */}
			<div className={styles.tableContainer}>
				<div className={styles.tableWrap}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>
									<div className={styles.thContent}>
										<span>Имя</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Email</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Статус</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Дата создания</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Компания</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Телефон</span>
									</div>
								</th>
								<th>
									<div className={styles.thContent}>
										<span>Теги</span>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{leads.length === 0 ? (
								<tr>
									<td colSpan={7} className={styles.emptyState}>
										<div className={styles.emptyContent}>
											<svg
												className={styles.emptyIcon}
												viewBox="0 0 24 24"
												fill="none"
											>
												<path
													d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													stroke="currentColor"
													strokeWidth="2"
												/>
											</svg>
											<h3>Нет лидов</h3>
											<p>Здесь будут отображаться ваши лиды</p>
										</div>
									</td>
								</tr>
							) : (
								leads.map((lead, index) => (
									<tr key={lead.id} className={styles.tableRow}>
										<td className={styles.nameCell}>
											<div className={styles.avatar}>
												{lead.name?.charAt(0)?.toUpperCase() || "U"}
											</div>
											<span className={styles.name}>{lead.name}</span>
										</td>
										<td className={styles.emailCell}>{lead.email}</td>
										<td>
											<span
												className={`${styles.statusBadge} ${getStatusBadge(lead.status)}`}
											>
												{lead.status}
											</span>
										</td>
										<td className={styles.dateCell}>
											{new Date(lead.createdAt).toLocaleDateString("ru-RU")}
										</td>
										<td className={styles.companyCell}>{lead.company}</td>
										<td className={styles.phoneCell}>{lead.phone}</td>
										<td className={styles.tagsCell}>
											<div className={styles.tags}>
												{lead.tags.map((tag, tagIndex) => (
													<span key={tagIndex} className={styles.tag}>
														{tag}
													</span>
												))}
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Пагинация */}
				<div className={styles.pagination}>
					<button
						className={`${styles.btn} ${styles.secondary}`}
						disabled={page === 1}
						onClick={handlePrevious}
					>
						<svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
							<path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" />
						</svg>
						Назад
					</button>

					<div className={styles.pageInfo}>
						<span>
							Страница <strong>{page}</strong>
						</span>
					</div>

					<button
						className={`${styles.btn} ${styles.secondary}`}
						disabled={leads.length < pageSize}
						onClick={handleNext}
					>
						Вперёд
						<svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
							<path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};
