import Layout from '@/components/Layout';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';
import BackButton from '@/components/BackButton';
import FormatDate from '@/components/FormatDate';
import Image from 'next/image';
// import Arrow from '@/assets/arrow-left-solid.svg';


interface PostTypeInterface {
	id: number;
	contentHtml: string;
	data: {
		title: string;
		date: string;
		image: string;
	}
};

// export const getStaticProps: GetStaticProps<{ postData: Post }> = async ({ params }) => {
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
			<BackButton link="/"/>
			<h2>{ postData.data.title }</h2>
			<FormatDate date={postData.data.date}/>
			<Image src={postData.data.image} alt="image" width={100} height={100} />
			<article>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
			</article>
			{/* <Arrow/> */}
		</Layout>
	);
}