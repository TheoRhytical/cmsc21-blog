import Layout from "@/components/Layout";
import BackButton from "@/components/BackButton";
import localFont from "@next/font/local";


const tungstenBold = localFont({ src: '../../assets/fonts/TungstenBold.ttf'});


export default function Create() {
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

			<form action="" method="post" className="create-post-form">
				<div className="input-group">
					<label htmlFor="title">Post Title: </label>
					<input 
						type="text" 
						name="title" 
						id="title"
					/>
				</div>

				<div className="input-group">
					<label htmlFor="img">Image: </label>
					<input
						type="file" 
						name="img" 
						id="img" 
						accept="image/*"
						/>
				</div>

				<div className="input-group">
					<label htmlFor="content">Content: </label>
					<input
						type="text" 
						name="content" 
						id="content" 
						/>
				</div>

				<input 
					type="submit" 
					value="Publish Blog" 
				/>
			</form>
			
		</Layout>
	);
}