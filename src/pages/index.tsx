import Layout from '../components/Layout';
import { getAllPostMetaData } from '@/lib/posts';


interface PostMetaDataInterface {
	title: string;
	date: string;
	image: string;
}

interface PropsInterface {
	posts: PostMetaDataInterface[];
}


export async function getStaticProps() {
	const posts = await getAllPostMetaData();
	posts.sort((a, b) => {
		let fa = a.date.toLowerCase(),
		fb = b.date.toLowerCase();

    if (fa < fb) {
        return 1;
    }
    if (fa > fb) {
        return -1;
    }
    return 0;
	});

	return {
		props: {
			posts
		}
	}
}

function FormatDate({date}: {date: string}) {
	const dateObj = new Date(date);
	const formattedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long'}).format(dateObj);
	return (
		<div>
			{formattedDate}
		</div>
	);
}



export default function Home(props: PropsInterface) {
	const { posts } = props;
	console.log(posts)
	return (
		<Layout>
			{}
			{ posts.map((post: PostMetaDataInterface) => (
				// console.log(post);
				<>
					<h2>{post.title}</h2>
					<div>{post.date}</div>
					<FormatDate date={post.date} />
					<div>This is an image: {post.image}</div>
				</>
			)) }
			Test
		</Layout>
	)
}