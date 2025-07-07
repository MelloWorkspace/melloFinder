import { createFileRoute } from "@tanstack/react-router";
import { Home } from "../../pages/ui/home/Home";

export const Route = createFileRoute("/")({
	component: Home,
});
