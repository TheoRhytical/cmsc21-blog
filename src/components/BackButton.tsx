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
			className='backbutton'
			style={{
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