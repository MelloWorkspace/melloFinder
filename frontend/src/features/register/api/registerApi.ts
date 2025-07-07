import { axiosInstance } from "../../../shared/api/axiosInstance";

export interface RegisterParameters {
	email: string;
	password: string;
	name: string;
}

export const RegisterApi = {
	register: async (parameters: RegisterParameters): Promise<void> => {
		await axiosInstance.post("/api/auth/register", parameters);
	},
};
