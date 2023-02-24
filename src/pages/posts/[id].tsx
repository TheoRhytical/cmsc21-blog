import Layout from '@/components/Layout';
import { getPostData, getAllPostIds } from '@/lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { ReactElement } from 'react';
import BackButton from '@/components/BackButton';
// import Arrow from '@/assets/arrow-left-solid.svg';


type PostType = {
	id: number,
	contentHtml: string
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


export default function Post({ postData }: { postData: PostType}) {
	return (
		<Layout>
			<BackButton link="/"/>
			{/* <Arrow/> */}
			{ postData.contentHtml }
		</Layout>
	);
}