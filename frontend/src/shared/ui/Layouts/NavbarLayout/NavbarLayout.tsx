import cn from "classnames";
import type { FC, ReactNode } from "react";

import styles from "./NavbarLayout.module.scss";
// TODO: через пропсы
import { Header } from "../../../../widgets/Header/ui/Header/Header";

interface Props {
	children: ReactNode;
}

export const NavbarLayout: FC<Props> = ({ children }) => {
	return (
		<div className={cn(styles.navbarLayout)}>
			<Header />
			{children}
		</div>
	);
};
