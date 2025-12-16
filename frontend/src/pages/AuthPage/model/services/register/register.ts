import { $api } from "../../../../../shared/api";
import { LoginParameters } from "../../types/types";

// FIXME: ? TYPO
export const register = async (parameters: LoginParameters): Promise<void> => {
	await $api.post("/auth/register", parameters);
};
