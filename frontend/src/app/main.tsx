import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "../shared/config/i18n/i18n";
import App from "./App";
import { ErrorBoundary } from "./providers";

const queryClient = new QueryClient();

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<ReactQueryDevtools initialIsOpen={false} position="bottom" />
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</QueryClientProvider>
			</BrowserRouter>
		</React.StrictMode>
	);
}
