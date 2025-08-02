import type { FC, ReactNode } from "react";

interface Props {
	icon: ReactNode;
	className?: string;
}

export const Icon: FC<Props> = ({ icon, className }) => (
	<span className={className}>{icon}</span>
);
