import { useState } from "react";
import { useLeadsStore } from "../model/store";
import type { LeadStatus } from "../types";
import styles from "../../../pages/leads/ui/leads.module.scss";

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

	return (
		<div className={styles.filters}>
			<input
				className={styles.input}
				name="name"
				placeholder="Имя"
				type="text"
				value={localFilters.name || ""}
				onChange={handleChange}
			/>
			<input
				className={styles.input}
				name="email"
				placeholder="Email"
				type="email"
				value={localFilters.email || ""}
				onChange={handleChange}
			/>
			<select
				className={styles.input}
				name="status"
				value={localFilters.status || ""}
				onChange={handleChange}
			>
				<option value="">Статус</option>
				{statusOptions.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			<input
				className={styles.input}
				name="company"
				placeholder="Компания"
				type="text"
				value={localFilters.company || ""}
				onChange={handleChange}
			/>
			<input
				className={styles.input}
				name="phone"
				placeholder="Телефон"
				type="text"
				value={localFilters.phone || ""}
				onChange={handleChange}
			/>
			<input
				className={styles.input}
				name="tags"
				placeholder="Теги (через запятую)"
				type="text"
				value={localFilters.tags ? localFilters.tags.join(", ") : ""}
				onChange={handleTagsChange}
			/>
			<input
				className={styles.input}
				name="createdAtFrom"
				placeholder="Дата создания от"
				type="date"
				value={localFilters.createdAtFrom || ""}
				onChange={handleChange}
			/>
			<input
				className={styles.input}
				name="createdAtTo"
				placeholder="Дата создания до"
				type="date"
				value={localFilters.createdAtTo || ""}
				onChange={handleChange}
			/>
			<div className={styles.btnRow}>
				<button className={styles.btn} onClick={handleApply}>
					Применить фильтры
				</button>
				<button
					className={`${styles.btn} ${styles.secondary}`}
					onClick={handleReset}
				>
					Сбросить
				</button>
			</div>
		</div>
	);
};
