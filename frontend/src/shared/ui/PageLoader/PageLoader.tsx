import { memo, type FC } from "react";
import { Loader } from "../Loader/Loader";

import styles from "./PageLoader.module.scss";

interface Props {
	className?: string;
}

export const PageLoader: FC<Props> = memo(() => (
	<div className={styles.wrap}>
		<Loader full />
	</div>
));
