import { create } from "zustand";
import type { LoginParams as LoginParameters } from "../api/authApi";
import { AuthApi } from "../api/authApi";

interface AuthState {
	loading: boolean;
	error: string | null;
	login: (parameters: LoginParameters) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	loading: false,
	error: null,
	login: async (parameters) => {
		set({ loading: true, error: null });
		try {
			await AuthApi.login(parameters);
			set({ loading: false });
		} catch (e: any) {
			set({
				loading: false,
				error: e?.response?.data?.message || "Ошибка входа",
			});
		}
	},
}));
