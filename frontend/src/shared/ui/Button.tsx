import type React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
	<button
		className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
		{...props}
	>
		{children}
	</button>
);
