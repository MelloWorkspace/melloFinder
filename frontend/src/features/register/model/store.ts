import { create } from "zustand";
import type { RegisterParams as RegisterParameters } from "../api/registerApi";
import { RegisterApi } from "../api/registerApi";

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
		} catch (e: any) {
			set({
				loading: false,
				error: e?.response?.data?.message || "Ошибка регистрации",
			});
		}
	},
}));
