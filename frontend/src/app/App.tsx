import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FunctionComponent } from "./types/types";
import { AppRouter } from "./providers/routes/AppRouter";

const queryClient = new QueryClient();

const App = (): FunctionComponent => {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} position="bottom" />
			<AppRouter />
		</QueryClientProvider>
	);
};

export default App;
