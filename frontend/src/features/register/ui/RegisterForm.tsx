import type React from "react";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "../model/store";

interface RegisterFields {
	email: string;
	password: string;
	name: string;
}

export const RegisterForm: React.FC = () => {
	const { register, handleSubmit } = useForm<RegisterFields>();
	const { register: registerUser, loading, error } = useRegisterStore();

	const onSubmit = async (data: RegisterFields): Promise<void> => {
		await registerUser(data);
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					placeholder="Имя"
					type="text"
					{...register("name", { required: true })}
					className="w-full border px-3 py-2 rounded"
				/>
			</div>
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
				Зарегистрироваться
			</button>
		</form>
	);
};
