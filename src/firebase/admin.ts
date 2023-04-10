import { apps, credential } from 'firebase-admin';
import { initializeApp, getApp } from 'firebase-admin/app';
// import { initializeApp, apps, credential, firestore, auth } from "firebase-admin";
import serviceAccount from "@/firebase/cmsc21-blog-firebase-adminsdk-1z0t0-e1315f0237.json";
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { getFirestore } from 'firebase-admin/firestore';


export function getAdminApp() {
	if (apps.length > 0) {
		return getApp();
	}
	return initializeApp({
		credential: credential.cert({
			projectId: serviceAccount.project_id,
			clientEmail: serviceAccount.client_email,
			privateKey: serviceAccount.private_key.replace(/\\n/g, '\n')
		}),
	});
}

export const adminApp = getAdminApp();


export const defaultFirestore= getFirestore();
export const defaultAuth = getAuth();


// export { auth }