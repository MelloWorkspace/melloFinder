import { create } from "zustand";
import type { Lead, LeadFilter } from "../types";

interface LeadsState {
	leads: Array<Lead>;
	filters: LeadFilter;
	loading: boolean;
	error: string | null;
	page: number;
	pageSize: number;
	setPage: (page: number) => void;
	setPageSize: (size: number) => void;
	setFilters: (filters: LeadFilter) => void;
	fetchLeads: () => void;
}

const mockLeads: Array<Lead> = [
	{
		id: "1",
		name: "Иван Иванов",
		email: "ivan@example.com",
		status: "new",
		createdAt: "2024-06-01",
		company: "ООО Ромашка",
		phone: "+79991234567",
		tags: ["VIP", "Москва"],
	},
	{
		id: "2",
		name: "Петр Петров",
		email: "petr@example.com",
		status: "customer",
		createdAt: "2024-05-20",
		company: "ЗАО Лидер",
		phone: "+79997654321",
		tags: ["СПб"],
	},
	// ...добавь больше моков для теста пагинации
];

export const useLeadsStore = create<LeadsState>((set, get) => ({
	leads: [],
	filters: {},
	loading: false,
	error: null,
	page: 1,
	pageSize: 10,
	setPage: (page: number) => {
		set({ page });
	},
	setPageSize: (pageSize: number) => {
		set({ pageSize });
	},
	setFilters: (filters: LeadFilter): void => {
		set({ filters, page: 1 });
	},
	fetchLeads: (): void => {
		set({ loading: true, error: null });
		try {
			// Фильтрация и пагинация на клиенте
			const { filters, page, pageSize } = get();
			let filtered = mockLeads;
			if (filters.name)
				filtered = filtered.filter((l) =>
					l.name.toLowerCase().includes(filters.name.toLowerCase())
				);
			if (filters.email)
				filtered = filtered.filter((l) =>
					l.email.toLowerCase().includes(filters.email.toLowerCase())
				);
			if (filters.status)
				filtered = filtered.filter((l) => l.status === filters.status);
			if (filters.company)
				filtered = filtered.filter((l) =>
					l.company.toLowerCase().includes(filters.company.toLowerCase())
				);
			if (filters.phone)
				filtered = filtered.filter((l) => l.phone.includes(filters.phone));
			if (filters.tags && filters.tags.length > 0)
				filtered = filtered.filter((l) =>
					filters.tags?.every((tag) => l.tags.includes(tag))
				);
			if (filters.createdAtFrom)
				filtered = filtered.filter(
					(l) => l.createdAt >= filters.createdAtFrom!
				);
			if (filters.createdAtTo)
				filtered = filtered.filter((l) => l.createdAt <= filters.createdAtTo!);
			const start = (page - 1) * pageSize;
			const paged = filtered.slice(start, start + pageSize);
			set({ leads: paged, loading: false });
		} catch (error: unknown) {
			let message = "Ошибка загрузки лидов";
			if (error instanceof Error && typeof error.message === "string") {
				message = error.message;
			}
			set({ loading: false, error: message });
		}
	},
}));
