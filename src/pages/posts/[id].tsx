import Layout from '@/components/Layout';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { ParsedUrlQuery } from 'querystring';
import BackButton from '@/components/BackButton';
import FormatDate from '@/components/FormatDate';
import localFont from '@next/font/local';
import { doc, collection, query, getDoc, getDocs } from 'firebase/firestore';
import { defaultFirestore as db } from '@/firebase/clientApp';

const tungstenBold = localFont({ src: '../../assets/fonts/TungstenBold.ttf'});

// interface PostTypeInterface {
// 	id: number;
// 	contentHtml: string;
// 	data: {
// 		title: string;
// 		date: string;
// 		image: string;
// 	}
// };



interface PostInterface {
	id: string;
	title: string;
	date: string;
	image: string;
	contentHtml: string;
}


export async function getStaticProps({ params }: {params: any}){
	const postId: string = (params as ParsedUrlQuery).id as string;
	const postRef = doc(db, "posts", postId);
	const postSnap = await getDoc(postRef);

	const postData = (postSnap.exists()) ? postSnap.data() : [];
	const dateOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long"
	}
	const post: PostInterface = {
		id: postSnap.id,
		title: postData.title,
		date: postData.uploadDate.toDate().toLocaleDateString("en-US", dateOptions),
		image: postData.img,
		contentHtml: postData.content
	}

	// const posts = await getPostData(Number((params as ParsedUrlQuery).id));
	return {
		props: {
			post,
		},
	};
};

interface PathInterface {
	params: {
		id: string
	};
}

export async function getStaticPaths() {
	// const paths = await getAllPostIds();
	const querySnapshot = await getDocs(collection(db, "posts"));
	let paths: PathInterface[] = [];
	querySnapshot.forEach((post) => {
		paths.push({
			params: {
				id: post.id
			}
		});
	})
	return {
		paths,
		fallback: false
	};
}


export default function Post({ post }: { post: PostInterface}) {
	return (
		<Layout>
			<div className='post-header'>
				<BackButton link="/"/>
				<div 
					style={{
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<h2 className={`${tungstenBold.className} post-title`}>{ post.title }</h2>
					<div style={{marginTop: '1rem'}}>
						{post.date}
					</div>
						<img src={`/uploads/posts/${post.image}`} style={{ height: '350px', width: 'auto'}}/>
				</div>
			</div>
			<article style={{
				padding: '0rem 4rem',
				textAlign: 'justify'
			}}>
				<div dangerouslySetInnerHTML={{ __html: post.contentHtml }}/>
			</article>
		</Layout>
	);
}