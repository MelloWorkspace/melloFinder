import type React from "react";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
	props
) => <input className="w-full border px-3 py-2 rounded" {...props} />;
