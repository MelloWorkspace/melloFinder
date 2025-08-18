export interface AuthState {
	loading: boolean;
	error?: string;
	actions: {
		login: (parameters: LoginParameters) => Promise<void>;
		register: (parameters: RegisterParameters) => Promise<void>;
	};
}

export interface LoginParameters {
	email: string;
	password: string;
}

export interface RegisterParameters {
	email: string;
	password: string;
	name: string;
	phone: string;
}
