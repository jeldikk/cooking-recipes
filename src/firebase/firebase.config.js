import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfoyVyf5EbSiv3kIcBoGCV9vnnUaMLk6s",
  authDomain: "cooking-recipe-ninja-7d70d.firebaseapp.com",
  projectId: "cooking-recipe-ninja-7d70d",
  storageBucket: "cooking-recipe-ninja-7d70d.appspot.com",
  messagingSenderId: "201953871975",
  appId: "1:201953871975:web:86951dd4b55bbb4721ecc2",
};

//initialise firebase
firebase.initializeApp(firebaseConfig);

//initialise firestore service
export const firestoreService = firebase.firestore();
