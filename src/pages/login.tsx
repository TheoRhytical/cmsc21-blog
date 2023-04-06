import Layout from "@/components/Layout";
import firebaseApp, { firebaseAuth } from "@/firebase/clientApp";
// import firebase from 'firebase/app';
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import { GoogleAuthProvider } from "firebase/auth";


// const auth = getAuth(firebaseApp);
const uiConfig = {
	signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function Login() {
	return (
		<Layout>
			<div style={{textAlign: 'center'}}>
				<h3>Login</h3>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
			</div>
	</Layout>
	);
}