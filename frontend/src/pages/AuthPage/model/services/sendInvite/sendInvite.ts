import { $api } from "../../../../../shared/api";
import { InviteResponse, SendInviteParameters } from "../../types/types";

export const sendInvite = async (
	parameters: SendInviteParameters
): Promise<InviteResponse> => {
	const response = await $api.post<{
		data: InviteResponse;
		message: string;
		success: boolean;
	}>("/auth/invite", parameters);

	return response.data.data;
};
