import Layout from '@/components/Layout';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { ParsedUrlQuery } from 'querystring';
import BackButton from '@/components/BackButton';
import FormatDate from '@/components/FormatDate';
import localFont from '@next/font/local';

const tungstenBold = localFont({ src: '../../assets/fonts/TungstenBold.ttf'});

interface PostTypeInterface {
	id: number;
	contentHtml: string;
	data: {
		title: string;
		date: string;
		image: string;
	}
};

export async function getStaticProps({ params }: {params: any}){
	const postId: number = Number((params as ParsedUrlQuery).id);
	const postData = await getPostData(postId);
	return {
		props: {
			postData,
		},
	};
};

export async function getStaticPaths() {
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: false
	};
}


export default function Post({ postData }: { postData: PostTypeInterface}) {
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
					<h2 className={`${tungstenBold.className} post-title`}>{ postData.data.title }</h2>
					<FormatDate date={postData.data.date}/>
						<img src={postData.data.image} style={{ height: '350px', width: 'auto'}}/>
				</div>
			</div>
			<article style={{
				padding: '0rem 4rem',
				textAlign: 'justify'
			}}>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
			</article>
		</Layout>
	);
}