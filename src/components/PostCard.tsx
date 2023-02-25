import Link from 'next/link';
import Image from 'next/image';
import FormatDate from '@/components/FormatDate';


interface PostMetaDataInterface {
	id: number;
	title: string;
	date: string;
	image: string;
}


interface PropsInterface {
	post: PostMetaDataInterface;
};


export default function PostCard(props: PropsInterface) {
	const { post } = props;
	return (
		<Link href={`/posts/${post.id}`} className="postcard">
			<Image src={post.image} alt="image" width={100} height={100} />
			<h3 style={{marginBottom: '0.25rem'}}>{post.title}</h3>
			<FormatDate date={post.date} />
		</Link>
	)
}