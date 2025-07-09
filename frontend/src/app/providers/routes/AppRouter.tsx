// src/app/providers/router/AppRouter.tsx
import type { FunctionComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Leads } from "../../../pages/leads";
import { AuthPage } from "../../../pages/auth";

const isAuthenticated = Boolean(localStorage.getItem("token"));

export const AppRouter: FunctionComponent = () => {
	return (
		<Routes>
			{/* Public routes */}
			<Route element={<AuthPage />} path="/auth" />
			{/* <Route element={<RegisterPage />} path="/register" /> */}

			{/* Protected routes */}
			{isAuthenticated ? (
				<>
					<Route element={<Leads />} path="/leads" />
					<Route element={<Navigate to="/leads" />} path="*" />
				</>
			) : (
				<Route element={<Navigate to="/auth" />} path="*" />
			)}
		</Routes>
	);
};
