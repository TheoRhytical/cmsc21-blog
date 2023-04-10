import * as admin from 'firebase-admin';
// import { initializeApp, apps, credential, firestore, auth } from "firebase-admin";
import serviceAccount from "@/firebase/cmsc21-blog-firebase-adminsdk-1z0t0-e1315f0237.json";


if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: serviceAccount.project_id,
			clientEmail: serviceAccount.client_email,
			privateKey: serviceAccount.private_key.replace(/\\n/g, '\n')
		}),
	});
}

const firestore = admin.firestore();
const auth = admin.auth();


export { firestore, auth }