import type React from "react";
import { useState } from "react";
import { LoginForm } from "../../../features/auth/ui/LoginForm";
import { RegisterForm } from "../../../features/register/ui/RegisterForm";

export const AuthPage: React.FC = () => {
	const [tab, setTab] = useState<"login" | "register">("login");

	return (
		<div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
			<div className="flex mb-6">
				<button
					className={`flex-1 py-2 ${tab === "login" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
					onClick={() => {
						setTab("login");
					}}
				>
					Вход
				</button>
				<button
					className={`flex-1 py-2 ${tab === "register" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
					onClick={() => {
						setTab("register");
					}}
				>
					Регистрация
				</button>
			</div>
			{tab === "login" ? <LoginForm /> : <RegisterForm />}
		</div>
	);
};
