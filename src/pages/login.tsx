import Layout from "@/components/Layout";
import firebaseApp from "@/firebase/clientApp";
// import firebase from 'firebase/app';
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// const auth = getAuth(firebaseApp);
const uiConfig = {
	signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

const firebaseAuth = getAuth(firebaseApp);

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