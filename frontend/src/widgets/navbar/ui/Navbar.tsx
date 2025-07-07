interface NavbarProps {
	className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
	return (
		<nav className={className}>
			<ul>
				<li>Home</li>
				<li>About</li>
				<li>Contact</li>
			</ul>
		</nav>
	);
};
