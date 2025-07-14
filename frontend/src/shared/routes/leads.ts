// leads.ts
import { Route } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";
import Leads from "../../pages/leads/ui/Leads";

export const leadsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "leads",
	component: Leads,
});
