import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const postDirectory = path.join(process.cwd(), 'posts');


export async function getAllPostIds() {
	const fileNames = fs.readdirSync(postDirectory);

	return fileNames.map(fileName => {
		return {
			params: {
				id: fileName.replace(/\.md$/, ''),
			}
		};
	});
}


export async function getAllPostMetaData() {
	const fileNames = fs.readdirSync(postDirectory);
	// console.log(fileNames)
	return fileNames.map(fileName => {
		const key = Number(fileName.replace(/\.md$/, ''));
		const fullPath = path.join(postDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		const { data: metadata } = matter(fileContents);
		return {
			id: key,
			date: metadata.date,
			...metadata
		};
	});
}


export async function getPostData(id: number) {
	const fullPath = path.join(postDirectory, `${id.toString()}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	const { content, data } = matter(fileContents);
	// console.log('postData', matterResult);
	const processContent = await remark()
		.use(html)
		.process(content);

	const contentHtml = processContent.toString();

	return {
		id,
		contentHtml,
		data
		// ...matterResult.data,
	};
}

