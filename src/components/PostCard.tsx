import Link from 'next/link';
import Image from 'next/image';
import FormatDate from '@/components/FormatDate';
import { Timestamp } from 'firebase/firestore';


interface PostMetaDataInterface {
	id: number;
	title: string;
	date: string;
	image: string;
}

interface FirebasePostMetaDataInterface {
	id: string;
	title: string;
	date: string;
	image: string;
}

interface PropsInterface {
	post: PostMetaDataInterface;
};

interface FirebasePropsInterface {
	firebasePost: FirebasePostMetaDataInterface;
}


export default function PostCard(props: PropsInterface) {
	const { post } = props;
	return (
		<Link href={`/posts/${post.id}`} className="postcard">
			<Image src={post.image} alt="image" width={100} height={100} />
			<FormatDate date={post.date} />
			<h3 style={{marginTop: '0.25rem'}}>{post.title}</h3>
		</Link>
	)
}

export function FirebasePostCard(props: FirebasePropsInterface) {
	const { firebasePost } = props;
	return (
		<Link href={`/posts/${firebasePost.id}`} className="postcard">
			<Image src={`/uploads/posts/${firebasePost.image}`} alt="image" width={100} height={100} />
			<div style={{marginTop: '1rem'}}>
				{firebasePost.date}
			</div>
			<h3 style={{marginTop: '0.25rem'}}>{firebasePost.title}</h3>
		</Link>
	)
}