import { createRoute } from "@tanstack/react-router";
import { AuthPage } from "../../pages/auth";
import { Route } from ".";

export const authRoute = createRoute({
	path: "/auth",
	getParentRoute: () => Route,
	component: AuthPage,
});
