// import { createRouter } from "@tanstack/react-router";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
// import { routeTree } from "./shared/routes/routeTree.gen.ts";
// import "./styles/tailwind.css";
import "./shared/config/i18n/i18n.ts";

// const router = createRouter({
// 	routeTree,
// 	context: {
// 		auth: {
// 			isAuthenticated: Boolean(localStorage.getItem("token")),
// 		},
// 	},
// });

// export type TanstackRouter = typeof router;

// declare module "@tanstack/react-router" {
// 	interface Register {
// 		// This infers the type of our router and registers it across your entire project
// 		router: TanstackRouter;
// 	}
// }

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<React.Suspense fallback="loading">
					{/* <App router={router} /> */}
					<App />
				</React.Suspense>
			</BrowserRouter>
		</React.StrictMode>
	);
}
