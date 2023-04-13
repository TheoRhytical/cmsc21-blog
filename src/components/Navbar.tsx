import NavLink from "@/components/NavLink";
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import Banorant from '@/assets/banorant.svg';
import Link from 'next/link';
import { useGetFirebaseUser } from "@/firebase/clientApp";

export default function Navbar() {
	const [ user ] = useGetFirebaseUser();
	return (
		<div className="navbar">
			<Link href="/" className="logo">
				<Image src={logo} alt="logo" style={{width: 'auto', height: '5rem'}}/>
				<Banorant style={{ height: '3rem', width: 'auto'}}/>
			</Link>
			<ul>
				<NavLink link="rhys" text="Rhys Barriga"/>
				<NavLink link="marfred" text="Marfred Deen"/>
				<NavLink link="akhyra" text="Akhyra Oplado"/>
				{ user === null && <NavLink link="/login" text="Login" /> }
			</ul>

		</div>
	)
}