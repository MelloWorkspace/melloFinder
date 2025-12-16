import { $api } from "../../../../../shared/api";
import { AcceptInviteParameters, AuthResponse } from "../../types/types";

export const acceptInvite = async (
	parameters: AcceptInviteParameters
): Promise<AuthResponse> => {
	const response = await $api.post<{
		data: AuthResponse;
		message: string;
		success: boolean;
	}>("/auth/accept-invite", parameters);

	return response.data.data;
};
