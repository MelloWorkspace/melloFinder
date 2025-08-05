import type { FC, ReactNode } from "react";

import styles from "./MainLayout.module.scss";

interface Props {
	header: ReactNode;
	children: ReactNode;
}

export const MainLayout: FC<Props> = ({ children, header }) => {
	return (
		<div className={styles.mainLayout}>
			{header}
			<div className={styles.contentContainer}>{children}</div>
		</div>
	);
};
