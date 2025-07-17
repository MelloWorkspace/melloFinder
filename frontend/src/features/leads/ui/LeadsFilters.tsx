import { useState } from "react";
import { useLeadsStore } from "../model/store";
import type { LeadStatus } from "../types";
import styles from "./leads-filter.module.scss";

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
	{ value: "new", label: "Новый" },
	{ value: "contacted", label: "Связались" },
	{ value: "qualified", label: "Квалифицирован" },
	{ value: "lost", label: "Потерян" },
	{ value: "customer", label: "Клиент" },
];

const initialFilters = {};

export const LeadsFilters: React.FC = () => {
	const { setFilters, fetchLeads } = useLeadsStore();
	const [localFilters, setLocalFilters] = useState(initialFilters);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		const { name, value } = event.target;
		setLocalFilters((previous) => ({ ...previous, [name]: value }));
	};

	const handleTagsChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setLocalFilters((previous) => ({
			...previous,
			tags: event.target.value.split(",").map((t) => t.trim()),
		}));
	};

	const handleApply = (): void => {
		setFilters(localFilters);
		fetchLeads();
	};

	const handleReset = (): void => {
		setLocalFilters(initialFilters);
		setFilters(initialFilters);
		fetchLeads();
	};

	const hasActiveFilters = Object.keys(localFilters).some(
		(key) => localFilters[key] && localFilters[key].length > 0
	);

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.filtersHeader}>
				<div className={styles.headerLeft}>
					<svg className={styles.filterIcon} viewBox="0 0 24 24" fill="none">
						<path
							d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"
							stroke="currentColor"
							strokeWidth="2"
						/>
					</svg>
					<h3 className={styles.filtersTitle}>Фильтры</h3>
					{hasActiveFilters && (
						<span className={styles.activeFiltersCount}>
							{
								Object.keys(localFilters).filter(
									(key) => localFilters[key] && localFilters[key].length > 0
								).length
							}
						</span>
					)}
				</div>
				<button
					className={styles.expandButton}
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<svg
						className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ""}`}
						viewBox="0 0 24 24"
						fill="none"
					>
						<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
					</svg>
				</button>
			</div>

			<div
				className={`${styles.filtersContent} ${isExpanded ? styles.expanded : ""}`}
			>
				<div className={styles.filtersGrid}>
					{/* Основные фильтры */}
					<div className={styles.inputGroup}>
						<label className={styles.label}>Имя</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<path
									d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<circle
									cx="12"
									cy="7"
									r="4"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="name"
								placeholder="Введите имя"
								type="text"
								value={localFilters.name || ""}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Email</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<path
									d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<polyline
									points="22,6 12,13 2,6"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="email"
								placeholder="Введите email"
								type="email"
								value={localFilters.email || ""}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Статус</label>
						<div className={styles.selectWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<path
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<select
								className={styles.select}
								name="status"
								value={localFilters.status || ""}
								onChange={handleChange}
							>
								<option value="">Выберите статус</option>
								{statusOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
							<svg
								className={styles.selectArrow}
								viewBox="0 0 24 24"
								fill="none"
							>
								<path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" />
							</svg>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Компания</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<rect
									x="2"
									y="3"
									width="20"
									height="14"
									rx="2"
									ry="2"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="8"
									y1="21"
									x2="16"
									y2="21"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="12"
									y1="17"
									x2="12"
									y2="21"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="company"
								placeholder="Введите компанию"
								type="text"
								value={localFilters.company || ""}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Телефон</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<path
									d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="phone"
								placeholder="Введите телефон"
								type="text"
								value={localFilters.phone || ""}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Теги</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<path
									d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="7"
									y1="7"
									x2="7.01"
									y2="7"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="tags"
								placeholder="Теги через запятую"
								type="text"
								value={localFilters.tags ? localFilters.tags.join(", ") : ""}
								onChange={handleTagsChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Дата создания от</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<rect
									x="3"
									y="4"
									width="18"
									height="18"
									rx="2"
									ry="2"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="16"
									y1="2"
									x2="16"
									y2="6"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="8"
									y1="2"
									x2="8"
									y2="6"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="3"
									y1="10"
									x2="21"
									y2="10"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="createdAtFrom"
								type="date"
								value={localFilters.createdAtFrom || ""}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.inputGroup}>
						<label className={styles.label}>Дата создания до</label>
						<div className={styles.inputWrapper}>
							<svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none">
								<rect
									x="3"
									y="4"
									width="18"
									height="18"
									rx="2"
									ry="2"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="16"
									y1="2"
									x2="16"
									y2="6"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="8"
									y1="2"
									x2="8"
									y2="6"
									stroke="currentColor"
									strokeWidth="2"
								/>
								<line
									x1="3"
									y1="10"
									x2="21"
									y2="10"
									stroke="currentColor"
									strokeWidth="2"
								/>
							</svg>
							<input
								className={styles.input}
								name="createdAtTo"
								type="date"
								value={localFilters.createdAtTo || ""}
								onChange={handleChange}
							/>
						</div>
					</div>
				</div>

				<div className={styles.filtersActions}>
					<button
						className={`${styles.btn} ${styles.primary}`}
						onClick={handleApply}
					>
						<svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
							<path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" />
						</svg>
						Применить фильтры
					</button>
					<button
						className={`${styles.btn} ${styles.secondary}`}
						onClick={handleReset}
					>
						<svg className={styles.btnIcon} viewBox="0 0 24 24" fill="none">
							<path
								d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path d="M21 3v5h-5" stroke="currentColor" strokeWidth="2" />
							<path
								d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"
								stroke="currentColor"
								strokeWidth="2"
							/>
							<path d="M8 16l-5 5v-5" stroke="currentColor" strokeWidth="2" />
						</svg>
						Сбросить
					</button>
				</div>
			</div>
		</div>
	);
};
