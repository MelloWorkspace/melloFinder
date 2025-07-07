import type React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../model/store";

interface LoginFields {
	email: string;
	password: string;
}

export const LoginForm: React.FC = () => {
	const { register, handleSubmit } = useForm<LoginFields>();
	const { login, loading, error } = useAuthStore();

	const onSubmit = async (data: LoginFields): Promise<void> => {
		await login(data);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					placeholder="Email"
					type="email"
					{...register("email", { required: true })}
					className="w-full border px-3 py-2 rounded"
				/>
			</div>
			<div>
				<input
					placeholder="Пароль"
					type="password"
					{...register("password", { required: true })}
					className="w-full border px-3 py-2 rounded"
				/>
			</div>
			{error && <div className="text-red-500 text-sm">{error}</div>}
			<button
				className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
				disabled={loading}
				type="submit"
			>
				Войти
			</button>
		</form>
	);
};
