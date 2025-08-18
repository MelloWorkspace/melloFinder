import { $api } from "../../../../../shared/api";
import type { RegisterParameters } from "../../types/types";

export const register = async (
	parameters: RegisterParameters
): Promise<void> => {
	await $api.post("/auth/register", parameters);
};
