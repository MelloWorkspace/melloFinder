import type React from "react";
import { LeadsFilters } from "../../../features/leads/ui/LeadsFilters";
import { useLeadsStore } from "../../../features/leads";
import styles from "./leads.module.scss";

const Leads: React.FC = () => {
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

	return (
		<div className={styles.container}>
			<LeadsFilters />
			{loading && <div style={{ textAlign: "center" }}>Загрузка...</div>}
			{error && (
				<div style={{ textAlign: "center", color: "#e53e3e" }}>{error}</div>
			)}
			<div className={styles.tableWrap}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Email</th>
							<th>Статус</th>
							<th>Дата создания</th>
							<th>Компания</th>
							<th>Телефон</th>
							<th>Теги</th>
						</tr>
					</thead>
					<tbody>
						{leads.length === 0 ? (
							<tr>
								<td
									colSpan={7}
									style={{ textAlign: "center", color: "#888", padding: 16 }}
								>
									Нет лидов
								</td>
							</tr>
						) : (
							leads.map((lead) => (
								<tr key={lead.id}>
									<td>{lead.name}</td>
									<td>{lead.email}</td>
									<td>{lead.status}</td>
									<td>{lead.createdAt}</td>
									<td>{lead.company}</td>
									<td>{lead.phone}</td>
									<td>{lead.tags.join(", ")}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
				<div className={styles.pagination}>
					<button
						className={`${styles.btn} ${styles.secondary}`}
						disabled={page === 1}
						onClick={handlePrevious}
					>
						Назад
					</button>
					<span>Страница {page}</span>
					<button
						className={`${styles.btn} ${styles.secondary}`}
						disabled={leads.length < pageSize}
						onClick={handleNext}
					>
						Вперёд
					</button>
				</div>
			</div>
		</div>
	);
};

export default Leads;
