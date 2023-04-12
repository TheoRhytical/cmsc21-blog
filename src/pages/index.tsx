import Layout from '../components/Layout';
import { getAllPostMetaData } from '@/lib/posts';
import PostCard, { FirebasePostCard } from '@/components/PostCard';
import { getFirebaseUser } from '@/firebase/clientApp';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { defaultFirestore as db } from '@/firebase/clientApp';
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
	firebasePosts: FirebasePostMetaDataInterface[];
	posts: PostMetaDataInterface[];
}


// Gets posts and sorts by date
export async function getStaticProps() {
	const postRef = collection(db, "posts");
	const postsQuery = query(postRef, orderBy("uploadDate", "desc"));
	const querySnapshot = await getDocs(postsQuery);
	let firebasePosts: FirebasePostMetaDataInterface[] = [];
	querySnapshot.forEach(post => {
		const postData = post.data();
		const dateOptions = {
			year: "numeric",
			month: "short",
			day: "numeric"
		}

		firebasePosts.push({
			id: post.id,
			date: postData.uploadDate.toDate().toLocaleDateString("en-US", dateOptions),
			title: postData.title,
			image: postData.img
		})
	})
	console.log(firebasePosts);
	const posts = await getAllPostMetaData();
	console.log(posts);
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
			firebasePosts,
			posts
		}
	}
}


export default function Home(props: PropsInterface) {
	const { firebasePosts, posts } = props;
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
			{ firebasePosts.map((post: FirebasePostMetaDataInterface) => (
				<FirebasePostCard firebasePost={post} key={post.id} />
			)) }
			{ posts.map((post: PostMetaDataInterface) => (
				<PostCard post={post} key={post.id}/>
			)) }
			</div>
		</Layout>
	)
}