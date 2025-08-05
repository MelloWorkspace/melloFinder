import type { FC } from "react";

import { Filters } from "../../../../widgets/Filters";
import { Sidebar } from "../../../../widgets/Sidebar";
import { Header } from "../../../../widgets/Header";

import { MainLayout } from "../../../../shared/ui";

const Leads: FC = () => {
	return (
		<MainLayout header={<Header />}>
			<Sidebar />
			<Filters />
		</MainLayout>
	);
};

export default Leads;
