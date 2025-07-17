import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./shared/config/i18n/i18n.ts";

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
