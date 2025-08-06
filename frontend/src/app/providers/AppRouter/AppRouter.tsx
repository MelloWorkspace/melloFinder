import { type FC, type ReactNode, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import {
	ROUTES,
	getLeadsPageRoute,
	getLoginPageRoute,
	getSignUpPageRoute,
	USER_TOKEN_KEY,
} from "../../../shared/constants";
import { PageLoader } from "../../../shared/ui";

const LeadsPage = lazy(() => import("../../../pages/LeadsPage"));
const AuthPage = lazy(() => import("../../../pages/AuthPage"));

type RouteKeys = (typeof ROUTES)[keyof typeof ROUTES];
interface RouteItem {
	path: string;
	public: boolean;
	element: ReactNode;
}
type RoutesConfig = Record<RouteKeys, RouteItem>;

const routesConfig: RoutesConfig = {
	[ROUTES.LOGIN]: {
		path: getLoginPageRoute(),
		public: true,
		element: <AuthPage />,
	},
	[ROUTES.SIGN_UP]: {
		path: getSignUpPageRoute(),
		public: true,
		element: <AuthPage />,
	},
	[ROUTES.LEADS]: {
		path: getLeadsPageRoute(),
		public: false,
		element: <LeadsPage />,
	},
};

const isAuthenticated = true;
const checkRouteAccess = (route: RouteItem) => {
	if (route.public) {
		return true;
	}
	if (isAuthenticated) {
		return true;
	}

	return false;
};

export const AppRouter: FC = () => {
	return (
		<Routes>
			{Object.values(routesConfig).map((i) => {
				const accessible = checkRouteAccess(i);
				if (accessible) {
					return (
						<Route
							path={i.path}
							element={
								<Suspense fallback={<PageLoader />}>{i.element}</Suspense>
							}
						/>
					);
				}
				return null;
			})}
			{isAuthenticated ? (
				<Route element={<Navigate to={getLeadsPageRoute()} />} path="/*" />
			) : (
				<Route
					element={<Navigate replace to={getLoginPageRoute()} />}
					path="/*"
				/>
			)}
		</Routes>
	);
};
