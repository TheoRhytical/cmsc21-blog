import { NextApiRequest, NextApiResponse } from 'next';
// import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { withAuth } from '@/lib/middleware/withAuth';
import { defaultFirestore } from '@/firebase/admin';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebase from 'firebase-admin/app';
import { Timestamp } from 'firebase-admin/firestore';


function handler(req: NextApiRequest, res: NextApiResponse){
	if (req.method !== 'POST') {
		res.status(405).json({
			message: 'Only POST requests'
		});
	}

	/**
	 * TODO: add validation
	 */

	const body = req.body;

	defaultFirestore.collection("posts").add({
		title: body.title,
		img: '',
		content: body.content,
		uploaderUuid: body.uid,
		uploadDate: Timestamp.now()
	}).then(docRef => {
		console.log("Document written to `posts` with ID: " + docRef.id);
	}).catch(err => {
		console.log("Error writing to `posts`", err);
		res.status(500).json({
			message: "Error uploading new blog entry"
		});
	});

	// console.log('body: ', body);

	res.status(200).json({
		data: 'Success'
	});
}


// Firebase auth middleware
// https://dev.to/dingran/next-js-firebase-authentication-and-middleware-for-api-routes-29m1
export default withAuth(handler);