import { create } from "zustand";

import { createRequestAction } from "../../../../shared/utils/createRequestAction/createRequestAction";
import { login } from "../services/login/login";
import { register } from "../services/register/register";
import type {
	AuthState,
	LoginParameters,
	RegisterParameters,
} from "../types/types";

const useAuthStore = create<AuthState>((set) => ({
	loading: false,
	actions: {
		login: createRequestAction<LoginParameters, AuthState>(login, set),
		register: createRequestAction<RegisterParameters, AuthState>(register, set),
	},
}));

export const getAuthLoading = () => useAuthStore((state) => state.loading);
export const getAuthError = () => useAuthStore((state) => state.error);
export const getAuthActions = () => useAuthStore((state) => state.actions);
