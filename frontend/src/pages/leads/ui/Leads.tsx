import type React from "react";
import styles from "./leads.module.scss";
import { NavbarLayout } from "../../../layouts";
import { Filters } from "../../../widgets/filters";
import { Sidebar } from "../../../widgets/sidebar";

const Leads: React.FC = () => {
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
