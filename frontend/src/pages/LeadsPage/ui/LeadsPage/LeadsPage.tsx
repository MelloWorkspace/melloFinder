import type { FC } from "react";

import { NavbarLayout } from "../../../../shared/ui";
import { Filters } from "../../../../widgets/Filters";
import { Sidebar } from "../../../../widgets/Sidebar";

import styles from "./LeadsPage.module.scss";

const Leads: FC = () => {
	return (
		<NavbarLayout>
			<div className={styles.container}>
				<Sidebar />
				<Filters />
			</div>
		</NavbarLayout>
	);
};

export default Leads;
