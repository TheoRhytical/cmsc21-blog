import NavLink from "@/components/NavLink";

export default function Navbar() {
	return (
		<div className="navbar">
			<div className="logo">
				<div>Logo here</div>
				<h2>BANORANT</h2>
			</div>
			<ul>
				<NavLink link="rhys" text="Rhys Barriga"/>
				<NavLink link="marfred" text="Marfred Deen"/>
				<NavLink link="akhyra" text="Akhyra Oplado"/>
			</ul>

		</div>
	)
}