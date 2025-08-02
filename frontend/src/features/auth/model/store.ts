import { create } from "zustand";
import { type LoginParameters, AuthApi } from "../api/authApi";
import { isAxiosError } from "axios";

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
		} catch (e: unknown) {
			let error: string = "Ошибка входа";
			if (isAxiosError<{ message?: string }>(e)) {
				error = e.response?.data?.message ?? error;
			}

			set({
				loading: false,
				error,
			});
		}
	},
}));
