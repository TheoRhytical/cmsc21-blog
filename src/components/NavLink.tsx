import Link from 'next/link';

interface PropsInterface {
	link: string;
	text: string;
};

export default function NavLink({ link, text}: PropsInterface) {
	return (
		<li>
			<Link href={`${link}`}>{ text }</Link>
		</li>
	)

}