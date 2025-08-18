import type { FC } from "react";

import { MainLayout } from "../../../../shared/ui";
import { Filters } from "../../../../widgets/Filters";
import { Header } from "../../../../widgets/Header";
import { Sidebar } from "../../../../widgets/Sidebar";

const Leads: FC = () => {
	return (
		<MainLayout header={<Header />}>
			<Sidebar />
			<Filters />
		</MainLayout>
	);
};

export default Leads;
