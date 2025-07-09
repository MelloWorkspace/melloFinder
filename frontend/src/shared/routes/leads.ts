// leads.ts
import { Route, redirect } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

export const leadsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "leads",
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <div>Leads page (protected)</div>,
});
