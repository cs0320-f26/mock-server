import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";

export default function Login() {
  return (
    <div
      style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
    >
      <button
        onClick={() => signInWithPopup(getAuth(app), new GoogleAuthProvider())}
      >
        Sign in with Google
      </button>
    </div>
  );
}
