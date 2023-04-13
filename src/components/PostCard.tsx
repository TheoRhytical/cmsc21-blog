import Link from 'next/link';
import Image from 'next/image';
import FormatDate from '@/components/FormatDate';
import { Timestamp } from 'firebase/firestore';



interface PostMetaDataInterface {
	id: string;
	title: string;
	date: string;
	image: string;
}

interface PropsInterface {
	post: PostMetaDataInterface;
};





export default function FirebasePostCard(props: PropsInterface) {
	const { post } = props;
	return (
		<Link 
			className="postcard"
			href={{
				pathname: '/posts/[id]',
				query: { id: post.id }
			}}
			>
			<Image src={`/uploads/posts/${post.image}`} alt="image" width={100} height={100} />
			<div style={{marginTop: '1rem'}}>
				{post.date}
			</div>
			<h3 style={{marginTop: '0.25rem'}}>{post.title}</h3>
		</Link>
	)
}