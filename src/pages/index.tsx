import Layout from '../components/Layout';
import { getAllPostMetaData } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { getFirebaseUser } from '@/firebase/clientApp';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { defaultFirestore as db } from '@/firebase/clientApp';
import { Timestamp } from 'firebase/firestore';


interface PostMetaDataInterface {
	id: string;
	title: string;
	date: string;
	image: string;
}

interface PropsInterface {
	posts: PostMetaDataInterface[];
}


// Gets posts and sorts by date
export async function getStaticProps() {
	const postRef = collection(db, "posts");
	const postsQuery = query(postRef, orderBy("uploadDate", "desc"));
	const querySnapshot = await getDocs(postsQuery);
	let posts: PostMetaDataInterface[] = [];
	querySnapshot.forEach(post => {
		const postData = post.data();
		const dateOptions = {
			year: "numeric",
			month: "short",
			day: "numeric"
		}

		posts.push({
			id: post.id,
			date: postData.uploadDate.toDate().toLocaleDateString("en-US", dateOptions),
			title: postData.title,
			image: postData.img
		})
	})

	return {
		props: {
			posts
		}
	}
}


export default function Home(props: PropsInterface) {
	const { posts } = props;
	const [user, loading, error] = getFirebaseUser();
	return (
		<Layout>
			<div style={{
				display: 'flex',
			}}>
			{ user && 
				<Link 
					href="/posts/create" 
					className="postcard" 
				>
					<div 
						className="create-post-button"
						style={{borderRadius: "1rem"}}
					>
						<FontAwesomeIcon 
							icon={faPlus}
							style={{
								fontSize: '4rem',
								color: 'black'
							}}
						/>
					</div>
					<h3>Add New Blog Entry</h3>
				</Link>
			}
			{ posts.map((post: PostMetaDataInterface) => (
				<PostCard post={post} key={post.id} />
			)) }
			</div>
		</Layout>
	)
}