import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAksFP0QXASxWOqgIFNd4opZDkUBEQUA0E",
  authDomain: "crown-db-3d5eb.firebaseapp.com",
  databaseURL: "https://crown-db-3d5eb.firebaseio.com",
  projectId: "crown-db-3d5eb",
  storageBucket: "crown-db-3d5eb.appspot.com",
  messagingSenderId: "856095499784",
  appId: "1:856095499784:web:98d660f818de27801013bd",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
