import "./styles/index.scss";

import type { FC } from "react";

import { AppRouter } from "./providers";

const App: FC = () => (
	<div className="app-default-theme">
		<AppRouter />
	</div>
);
export default App;
