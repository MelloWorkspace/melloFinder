import { create } from "zustand";
import { type RegisterParameters, RegisterApi } from "../api/registerApi";
import { isAxiosError } from "axios";

interface RegisterState {
	loading: boolean;
	error: string | null;
	register: (parameters: RegisterParameters) => Promise<void>;
}

export const useRegisterStore = create<RegisterState>((set) => ({
	loading: false,
	error: null,
	register: async (parameters) => {
		set({ loading: true, error: null });
		try {
			await RegisterApi.register(parameters);
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
