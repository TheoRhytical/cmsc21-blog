import Link from 'next/link';

type Props = {
	link: string,
	text: string
}

export default function NavLink({ link, text}: Props) {
	return (
		<li>
			<Link href={`${link}`}>{ text }</Link>
		</li>
	)

}