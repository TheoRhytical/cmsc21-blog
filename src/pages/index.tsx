import Layout from '../components/Layout';
import { getAllPostMetaData } from '@/lib/posts';
import PostCard from '@/components/PostCard';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { firebaseAuth } from '@/firebase/clientApp';
import { getFirebaseUser } from '@/firebase/clientApp';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface PostMetaDataInterface {
	id: number;
	title: string;
	date: string;
	image: string;
}

interface PropsInterface {
	posts: PostMetaDataInterface[];
}


// Gets posts and sorts by date
export async function getStaticProps() {
	const posts = await getAllPostMetaData();
	posts.sort((a, b) => {
		// console.log('post', a, b);
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


export default function Home(props: PropsInterface) {
	const { posts } = props;
	const [user, loading, error] = getFirebaseUser();
	// console.log("User", user);
	return (
		<Layout>
			<div style={{
				display: 'flex',
			}}>
				{/* TODO: Add "Create/Add Post" button */}

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
				<PostCard post={post} key={post.id}/>
			)) }
			</div>
		</Layout>
	)
}