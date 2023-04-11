import Layout from "@/components/Layout";
import { firebaseAuth, getFirebaseUser } from "@/firebase/clientApp";
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";


const uiConfig = {
	signInSuccessUrl: '/',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
  ],
};

export default function Login() {
	const router = useRouter();
	const [user, loading, error] = getFirebaseUser();
	if (typeof window !== 'undefined') {
		if (user) {
			router.push("/");
		}
	}
	return (
		<Layout>
			<div style={{textAlign: 'center'}}>
				<h3>Login</h3>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
			</div>
	</Layout>
	);
}