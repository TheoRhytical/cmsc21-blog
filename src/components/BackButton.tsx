import Link from 'next/link';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface PropsInterface {
	link: string;
};

export default function BackButton({ link }: PropsInterface) {
	return (
		<Link 
			href={link}
			style={{
				backgroundColor: 'red',
				display: 'grid',
				placeItems: 'center',
				height: '4rem',
				width: '4rem',
				padding: '0.5rem',
				borderRadius: '1rem',
		}}>
			<FontAwesomeIcon 
					icon={faArrowLeft}
					style={{
						fontSize: '4rem',
						color: 'black'
					}}
			/>
		</Link>
	)
}