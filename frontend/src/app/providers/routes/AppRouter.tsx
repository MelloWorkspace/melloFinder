import { lazy, Suspense, type FunctionComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// WORKAROUND: IMPORT WITHOUT PUBLIC API BECAUSE LAZY EXPECT DEFAULT IMPORT
const LeadsLazy = lazy(() => import("../../../pages/leads/ui/Leads"));
const AuthLazy = lazy(() => import("../../../pages/auth/ui/AuthPage"));

const isAuthenticated = Boolean(localStorage.getItem("token"));

export const AppRouter: FunctionComponent = () => {
	return (
		<Suspense fallback={<>Loading chunk...</>}>
			<Routes>
				{/* Public routes */}
				<Route path="/auth" element={<AuthLazy />} />

				{/* Protected routes */}
				{isAuthenticated ? (
					<>
						<Route path="/leads" element={<LeadsLazy />} />
						<Route path="*" element={<Navigate to="/leads" />} />
					</>
				) : (
					<Route path="*" element={<Navigate to="/auth" />} />
				)}
			</Routes>
		</Suspense>
	);
};
