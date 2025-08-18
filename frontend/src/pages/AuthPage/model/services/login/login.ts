import { $api } from "../../../../../shared/api";
import type { LoginParameters } from "../../types/types";

export const login = async (parameters: LoginParameters): Promise<void> => {
	await $api.post("/auth/login", parameters);
};
