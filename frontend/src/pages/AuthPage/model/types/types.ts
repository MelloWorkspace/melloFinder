export interface LoginParameters {
	email: string;
	password: string;
}

export interface SendInviteParameters {
	email: string;
	password: string;
	first_name: string;
	last_name: string;
}

export interface AcceptInviteParameters {
	token: string;
	password: string;
	first_name: string;
	last_name: string;
}

export interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	created_at: string;
	updated_at: string;
}

export interface AuthResponse {
	token: string;
	user: User;
}

export interface InviteResponse {
	message: string;
	token: string;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	loading: boolean;
	error: string | null;
	inviteToken: string | null;
	actions: {
		login: (params: LoginParameters) => Promise<void>;
		sendInvite: (params: SendInviteParameters) => Promise<void>;
		acceptInvite: (params: AcceptInviteParameters) => Promise<void>;
		logout: () => void;
		clearError: () => void;
	};
}
