import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";

const app = initializeApp(firebaseConfig);

export const handleSignInWithGoogle = () => {
  const GoogleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, GoogleProvider).then((res) =>
    handleResponse(res)
  );
};

export const handleSignInWithFacebook = () => {
  const FacebookProvider = new FacebookAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, FacebookProvider).then((res) =>
    handleResponse(res)
  );
};

const handleResponse = (res) => {
  const { displayName, email, photoURL } = res.user;
  const userSignIn = {
    IsSignIn: true,
    name: displayName,
    email: email,
    photo: photoURL || "https://i.ibb.co/5GzXkwq/user.png",
  };
  return userSignIn;
};

export const HandleSignOut = () => {
  const auth = getAuth();
  return signOut(auth)
    .then(() => {
      const userSignIn = {
        IsSignIn: false,
        name: '',
        email: '',
        photo: '',
      };
      return userSignIn;
    })
};
