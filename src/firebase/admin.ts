import { apps, credential } from 'firebase-admin';
import { initializeApp, getApp } from 'firebase-admin/app';
import serviceAccount from "@/firebase/cmsc21-blog-firebase-adminsdk-1z0t0-e1315f0237.json";
import { getAuth } from 'firebase-admin/auth';
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