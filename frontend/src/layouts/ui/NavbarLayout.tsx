import cn from "classnames";

import styles from "./navbar-layout.module.scss";
import { Navbar } from "../../widgets/navbar";

export const NavbarLayout: React.FC = ({
	children,
}: React.PropsWithChildren) => {
	return (
		<div className={cn(styles.navbarLayout)}>
			<Navbar />
			{children}
		</div>
	);
};
