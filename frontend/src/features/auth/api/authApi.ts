import { axiosInstance } from "../../../shared/api/axiosInstance";

export interface LoginParameters {
	email: string;
	password: string;
}

export const AuthApi = {
	login: async (parameters: LoginParameters): Promise<void> => {
		await axiosInstance.post("/api/auth/login", parameters);
	},
};
