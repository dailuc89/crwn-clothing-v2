import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwgNBP6SVLaSCbsySCveFjLAyrTHFkrrU",
  authDomain: "crwn-clothing-db-fb1f8.firebaseapp.com",
  projectId: "crwn-clothing-db-fb1f8",
  storageBucket: "crwn-clothing-db-fb1f8.appspot.com",
  messagingSenderId: "556126931852",
  appId: "1:556126931852:web:e53049a69426081faf64a9",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

const db = getFirestore();

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
