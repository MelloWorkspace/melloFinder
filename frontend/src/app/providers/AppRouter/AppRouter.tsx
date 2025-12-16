import type { FC, ReactNode } from "react";
import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
	getLeadsPageRoute,
	getLoginPageRoute,
	getSignUpPageRoute,
} from "../../../shared/constants";
import { PageLoader } from "../../../shared/ui";

const LeadsPage = lazy(() => import("../../../pages/LeadsPage"));
const AuthPage = lazy(() => import("../../../pages/AuthPage"));

/* =========================
   Guards
========================= */
const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const isAuthenticated = Boolean(localStorage.getItem("TOKEN"));
	if (isAuthenticated) {
		return <Navigate replace to={getLeadsPageRoute()} />;
	}
	return <>{children}</>;
};

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
	const isAuthenticated = Boolean(localStorage.getItem("TOKEN"));
	if (!isAuthenticated) {
		return <Navigate replace to={getLoginPageRoute()} />;
	}
	return <>{children}</>;
};

/* =========================
   Router
========================= */
export const AppRouter: FC = () => {
	const isAuthenticated = Boolean(localStorage.getItem("TOKEN"));

	return (
		<Routes>
			{/* ROOT */}
			<Route
				index
				element={
					<Navigate
						replace
						to={isAuthenticated ? getLeadsPageRoute() : getLoginPageRoute()}
					/>
				}
			/>

			{/* PUBLIC */}
			<Route
				path={getLoginPageRoute()}
				element={
					<PublicRoute>
						<Suspense fallback={<PageLoader />}>
							<AuthPage />
						</Suspense>
					</PublicRoute>
				}
			/>
			<Route
				path={getSignUpPageRoute()}
				element={
					<PublicRoute>
						<Suspense fallback={<PageLoader />}>
							<AuthPage />
						</Suspense>
					</PublicRoute>
				}
			/>

			{/* PRIVATE */}
			<Route
				path={getLeadsPageRoute()}
				element={
					<PrivateRoute>
						<Suspense fallback={<PageLoader />}>
							<LeadsPage />
						</Suspense>
					</PrivateRoute>
				}
			/>

			{/* FALLBACK */}
			<Route
				path="*"
				element={
					<Navigate
						replace
						to={isAuthenticated ? getLeadsPageRoute() : getLoginPageRoute()}
					/>
				}
			/>
		</Routes>
	);
};
