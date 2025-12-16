import { create } from "zustand";
import { persist } from "zustand/middleware";

import { acceptInvite } from "../services/acceptInvite/acceptinvite";
import { login } from "../services/login/login";
import { sendInvite } from "../services/sendInvite/sendInvite";
import {
	AcceptInviteParameters,
	AuthState,
	LoginParameters,
	SendInviteParameters,
} from "../types/types";

const useAuthStore = create<AuthState>()(
	persist(
		(set, _) => ({
			user: null,
			token: null,
			loading: false,
			error: null,
			inviteToken: null,
			actions: {
				login: async (params: LoginParameters) => {
					set({ loading: true, error: null });
					try {
						const response = await login(params);
						set({
							user: response.user,
							token: response.token,
							loading: false,
						});
						// Сохраняем токен в localStorage и добавляем в заголовки
						localStorage.setItem("token", response.token);
					} catch (error) {
						set({
							loading: false,
							error: error instanceof Error ? error.message : "Ошибка входа",
						});
						throw error;
					}
				},

				sendInvite: async (params: SendInviteParameters) => {
					set({ loading: true, error: null });
					try {
						const response = await sendInvite(params);
						set({
							loading: false,
							inviteToken: response.token,
						});
					} catch (error) {
						set({
							loading: false,
							error:
								error instanceof Error
									? error.message
									: "Ошибка отправки приглашения",
						});
						throw error;
					}
				},

				acceptInvite: async (params: AcceptInviteParameters) => {
					set({ loading: true, error: null });
					try {
						const response = await acceptInvite(params);
						set({
							user: response.user,
							token: response.token,
							loading: false,
							inviteToken: null,
						});
						localStorage.setItem("token", response.token);
					} catch (error) {
						set({
							loading: false,
							error:
								error instanceof Error
									? error.message
									: "Ошибка принятия приглашения",
						});
						throw error;
					}
				},

				logout: () => {
					set({
						user: null,
						token: null,
						error: null,
						inviteToken: null,
					});
					localStorage.removeItem("token");
				},

				clearError: () => {
					set({ error: null });
				},
			},
		}),
		{
			name: "auth-storage",
			partialize: (state) => ({
				user: state.user,
				token: state.token,
			}),
		}
	)
);

export const getAuthUser = () => useAuthStore((state) => state.user);
export const getAuthToken = () => useAuthStore((state) => state.token);
export const getAuthLoading = () => useAuthStore((state) => state.loading);
export const getAuthError = () => useAuthStore((state) => state.error);
export const getInviteToken = () => useAuthStore((state) => state.inviteToken);
export const getAuthActions = () => useAuthStore((state) => state.actions);
