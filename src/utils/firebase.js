// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBs3al3kYDVqXtC_20B5g9-N789PyKGDZA",
	authDomain: "netflix-gpt-881f2.firebaseapp.com",
	projectId: "netflix-gpt-881f2",
	storageBucket: "netflix-gpt-881f2.appspot.com",
	messagingSenderId: "826764564057",
	appId: "1:826764564057:web:3896554af185b4dd6bc348",
	measurementId: "G-DB1LX0GWP5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
