import { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import firebaseApp, { getFirebaseUser } from '@/firebase/clientApp';
import { withAuth } from '@/lib/middleware/withAuth';
import { firestore } from '@/firebase/admin';


async function handler(req: NextApiRequest, res: NextApiResponse){
	if (req.method !== 'POST') {
		res.status(405).json({
			message: 'Only POST requests'
		});
	}

	/**
	 * TODO: add validation
	 */

	// const db = getFirestore(firebaseApp);
	const body = req.body;

	try {
		// await firestore.collection('')
		const ref = firestore.ref('')
		// const docRef = await addDoc(collection(db, "users"), {
    // title: 
    // last: "Lovelace",
    // born: 1815
  // });
  // console.log("Document written with ID: ", docRef.id);
	} catch (err) {

	}

	// console.log('body: ', body);

	res.status(200).json({
		data: 'Success'
	});
}


// Firebase auth middleware
// https://dev.to/dingran/next-js-firebase-authentication-and-middleware-for-api-routes-29m1
export default withAuth(handler);