import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FunctionComponent } from "./types/types";
import { AppRouter } from "./providers/routes/AppRouter";
import "./styles/reset.scss";
import "./styles/global.scss";
import BoundaryProvider from "./providers/ErrorBoundary/BoundaryProvider";

const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<BoundaryProvider>
				<AppRouter />
			</BoundaryProvider>
		</QueryClientProvider>
	);
};

export default App;
