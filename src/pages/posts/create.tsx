import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";
import localFont from "@next/font/local";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { getFirebaseUser } from "@/firebase/clientApp";


const tungstenBold = localFont({ src: '../../assets/fonts/TungstenBold.ttf'});


const ReactQuill = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => <p>Loading...</p>
});


export default function Create() {
	const router = useRouter();
	const [user, loading, error] = getFirebaseUser();
	// console.log(user);

	// Redirect if not user is logged in
	if (typeof window !== 'undefined') {
		if (!user) {
			router.push("/");
		}
	}
	const [contentValue, setContentValue] = useState('');

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		
		const data = {
			title: event.target.title.value,
			img: event.target.img.value,
			content: event.target.content.value
		}

		const JSONdata = JSON.stringify(data);
		const endpoint = '/api/posts/create'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

		const result = await response.json();
		console.log('result', result);
	}

	return (
		<Layout>
			<div className="post-header">
				<BackButton link="/"/>
				<div 
					style={{
						display: 'grid',
						placeItems: 'center',
					}}
				>
					<h2 className={`${tungstenBold.className} post-title`}>Add New Blog Entry</h2>
				</div>
			</div>

			<form 
				onSubmit={handleSubmit} 
				// action="/api/posts/create"
				// method="post"
				className="create-post-form">
				<div className="input-group">
					<label htmlFor="title">Post Title: </label>
					<input 
						type="text" 
						name="title" 
						id="title"
						required
					/>
				</div>

				<div className="input-group">
					<label htmlFor="img">Image: </label>
					<input
						type="file" 
						name="img" 
						id="img" 
						accept="image/*"
						required
						/>
				</div>

				<div className="quill-group">
					<label htmlFor="content">Content: </label>
					<input
						type="hidden" 
						name="content" 
						id="content"
						value={contentValue}
						/>
					<ReactQuill theme="snow" onChange={setContentValue}/>
						{/* <div id="quill-area">test</div> */}
						{/* <textarea name="content" id="content" rows={10}></textarea> */}
					{/* </ReactQuill> */}
				</div>

				<input 
					type="submit" 
					value="Publish Blog" 
				/>
			</form>
			
		</Layout>
	);
}